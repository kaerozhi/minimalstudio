---
title: Immich 升级之后人脸无法识别，以及后续的解决办法
date: 2026-02-25
categories:
  - 软件
tags:
  - NAS
  - Unraid
  - Immich
description: 这怎么行？我不要脸的吗！
photos:
 - https://media.kaerozhi.com/2026/02/c6ae0a7361ebf0bfa126a19f9a5ec2f7.png
---
我在家里的 Unraid 系统上装了 Immich，作为照片备份及管理的主力平台。之前一直稳定运行，上周手贱升级了一下，忽然发现人脸识别就无法运行了。

后台手动运行人脸检测，查看日志，报错信息是这样的：

```bash
[Nest] 7  - 02/25/2026, 9:03:47 AM   ERROR [Microservices:{"id":"0c338aeb-e47d-44ad-8416-459e419db257","deferred":false}] Unable to run job handler (FacialRecognition): PostgresError: pgvecto.rs: The extension is upgraded so this index is outdated.
ADVICE: Rebuild the index. Please read `https://docs.pgvecto.rs/admin/upgrading.html`.
PostgresError: pgvecto.rs: The extension is upgraded so this index is outdated.
ADVICE: Rebuild the index. Please read `https://docs.pgvecto.rs/admin/upgrading.html`.
    at ErrorResponse (/usr/src/app/server/node_modules/.pnpm/postgres@3.4.8/node_modules/postgres/cjs/src/connection.js:815:30)
    at handle (/usr/src/app/server/node_modules/.pnpm/postgres@3.4.8/node_modules/postgres/cjs/src/connection.js:489:6)
    at Socket.data (/usr/src/app/server/node_modules/.pnpm/postgres@3.4.8/node_modules/postgres/cjs/src/connection.js:324:9)
    at Socket.emit (node:events:508:28)
    at addChunk (node:internal/streams/readable:559:12)
    at readableAddChunkPushByteMode (node:internal/streams/readable:510:3)
    at Readable.push (node:internal/streams/readable:390:5)
    at TCP.onStreamRead (node:internal/stream_base_commons:189:23)
```

看起来需要在数据库中重建人脸识别的索引？很不幸的是，提供的页面 https://docs.pgvecto.rs/admin/upgrading.html 域名已经过期了，文档打不开自然也提供不了任何参考，头疼。

还是先问问 Gemini，看看能不能在它的指引下找到解决办法。Gemini 的判断是：

> 这个报错的核心原因是因为 Immich 依赖的向量插件 **pgvecto.rs** 进行了版本升级，而旧的索引格式与新插件不兼容，导致数据库无法处理人脸识别的向量检索。

将 Docker Compose 文件喂给 Gemini，发现问题出在**数据库镜像的版本锁定**上。我配置的数据库版本还是：

```yaml
database:
  container_name: immich_postgres
  image: docker.io/tensorchord/pgvecto-rs:pg14-v0.2.0@sha256:739cdd626151ff1f796dc95a6591b55a714f341c737e27f045019ceabf8e8c52
```

Immich 在最近的几个版本更新中，要求 `pgvecto-rs` 升级到 **v0.3.x** 甚至更高。而我的版本还停留在 v0.2.0，对于当前的 Immich 来说已经非常老了。此时即使手动重建索引，但数据库版本不跟上，后续可能还会遇到兼容性导致的性能下降或搜索报错。总之就是配套得升级。

## 修正方案

建议按照以下步骤更新 `docker-compose.yml` 并修复数据库：

### 第一步：修改 Docker Compose 文件

将 `database` 的镜像行修改为目前官方推荐的稳定版本（注意：Immich 官方已将基础版本从 Postgres 14 迁移到了 **16**，但为了保证你的数据平滑升级，我们先保持在 14 的高小版本）：

```yaml
  database:
    container_name: immich_postgres
    # 修改为 v0.3.0 版本
    image: docker.io/tensorchord/pgvecto-rs:pg14-v0.3.0
```

> **提示**：如果你想一劳永逸，Immich 官方目前推荐的是 `tensorchord/pgvecto-rs:pg16-v0.3.0`，但大版本（14 跨到 16）升级需要导出再导入数据，风险较大。**现阶段建议仅升级插件版本（v0.2.0 -> v0.3.0）。**

### 第二步：应用变更

在 Unraid 终端或 Compose 目录下运行：

```bash
docker-compose up -d
```

### 第三步：进入数据库重建索引（关键）

由于插件版本变了，旧索引必须重建。在 Unraid 终端执行：

1. **进入数据库**：
        
    ```bash
    docker exec -it immich_postgres psql -U ${DB_USERNAME:-postgres} -d ${DB_DATABASE_NAME:-immich}
    ```
    
    _(如果报错，请手动替换变量名为你在 .env 里的值)_
    
2. **执行修复命令**：
           
    ```sql
    -- 卸载并重新安装插件以触发更新
    DROP EXTENSION IF EXISTS "vectors";
    CREATE EXTENSION IF NOT EXISTS "vectors";
    
    -- 删除旧索引
    DROP INDEX IF EXISTS "face_index";
    DROP INDEX IF EXISTS "clip_index";
    
    -- 重建人脸识别索引
    CREATE INDEX ON "asset_faces" USING vectors (embedding vector_cosine_ops);
    
    -- 重建搜索（CLIP）索引
    CREATE INDEX ON "smart_search" USING vectors (embedding vector_cosine_ops);
    ```
    
1. **退出**：输入 `\q`。

重启 immich_postgres，之后回到 Immich 后台，启动人脸检测任务，发现不再报错了，搞定！

## 是否需要升级到最新的 Postgres 16 版本？

简单的回答是：**目前没必要，除非你想顺便清理一下“技术债”。**

### 现状分析

1. **官方态度**：Immich 官方目前推荐的是 **Postgres 16**，并在新安装中默认使用。虽然他们表示未来（2026年晚些时候）可能会向 **Postgres 18** 迈进，但目前 Postgres 14 依然处于“支持”状态（只要 `pgvecto-rs` 插件版本够新即可）。
    
2. **迁移风险**：Postgres 的**大版本升级（14 → 16）是不支持直接更换镜像标签的**。如果你直接把 `pg14` 改成 `pg16`，容器会报错并无法启动，提示“数据目录是由旧版本初始化的”。
    

### 什么时候你**必须**升级？

- 如果你发现 Immich 更新日志明确标注“不再支持 Postgres 14”。
    
- 如果你觉得目前 14 版本的性能在大数据量下（几十万张照片）有瓶颈。

既然是这样，那就暂且放在一边，先用着吧。