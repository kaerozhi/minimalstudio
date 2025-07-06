import fs from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';

const contentDir = './src/content'; // Path to your content directory

async function cleanupFrontmatter() {
  try {
    const collections = await fs.readdir(contentDir);

    for (const collectionName of collections) {
      const collectionPath = path.join(contentDir, collectionName);
      const stat = await fs.stat(collectionPath);

      // Process only directories within /src/content/
      if (stat.isDirectory()) {
        const files = await fs.readdir(collectionPath);

        for (const file of files) {
          if (file.endsWith('.md') || file.endsWith('.mdx')) {
            const filePath = path.join(collectionPath, file);
            console.log(`Processing file: ${filePath}`);

            try {
              const fileContent = await fs.readFile(filePath, 'utf8');
              const { data, content } = matter(fileContent);

              let shouldUpdateFile = false;
              const updatedData = {}; // Start with an empty object for cleaned data

              // Iterate over existing frontmatter fields
              for (const key in data) {
                if (Object.prototype.hasOwnProperty.call(data, key)) {
                  const value = data[key];

                  // 1. Remove all empty values (null, undefined, empty string/array/object)
                  if (value === null || value === undefined ||
                      (typeof value === 'string' && value.trim() === '') ||
                      (Array.isArray(value) && value.length === 0) ||
                      (typeof value === 'object' && Object.keys(value).length === 0 && !Array.isArray(value) && !(value instanceof Date)) // Check for empty objects, but not Date objects
                  ) {
                    console.log(`  Removed empty field: '${key}'`);
                    shouldUpdateFile = true;
                    continue; // Skip adding this key to updatedData
                  }

                  // 2. Correct 'date' field
                  if (key === 'date') {
                    if (typeof value === 'string') {
                      const dateObj = new Date(value);
                      if (!isNaN(dateObj.getTime())) {
                        updatedData.date = dateObj; // Store as Date object for proper YAML serialization
                        shouldUpdateFile = true;
                        console.log(`  Corrected 'date' string to Date object: "${value}" -> "${dateObj.toISOString()}"`);
                      } else {
                        console.warn(`  Warning: 'date' field "${value}" is an invalid string. Removing it.`);
                        shouldUpdateFile = true;
                        continue; // Remove invalid date strings
                      }
                    } else if (!(value instanceof Date)) {
                      // If it's not a string or Date object (e.g., number, boolean)
                      console.warn(`  Warning: 'date' field "${value}" has an unsupported type (${typeof value}). Removing it.`);
                      shouldUpdateFile = true;
                      continue; // Remove unsupported date types
                    } else {
                        // Already a Date object, keep as is
                        updatedData.date = value;
                    }
                  }
                  // 3. Correct 'photos' field
                  else if (key === 'photos') {
                    if (typeof value === 'string') {
                      updatedData.photos = [value.trim()];
                      shouldUpdateFile = true;
                      console.log(`  Corrected 'photos' string to array: "${value}"`);
                    } else if (Array.isArray(value)) {
                      const cleanedPhotos = value.filter(item => typeof item === 'string' && item.trim() !== '');
                      if (cleanedPhotos.length === 0) {
                        console.log(`  Removed empty 'photos' array.`);
                        shouldUpdateFile = true;
                        continue; // Remove empty array
                      } else if (cleanedPhotos.length < value.length) {
                        updatedData.photos = cleanedPhotos;
                        shouldUpdateFile = true;
                        console.log(`  Cleaned 'photos' array (removed invalid/empty items).`);
                      } else {
                        updatedData.photos = value; // Array is already clean
                      }
                    } else {
                      console.warn(`  Warning: 'photos' field has an unsupported type (${typeof value}). Removing it.`);
                      shouldUpdateFile = true;
                      continue; // Remove unsupported photos types
                    }
                  }
                  // For all other fields, just copy them over
                  else {
                    updatedData[key] = value;
                  }
                }
              }

              // If any changes were made, write the file back
              if (shouldUpdateFile) {
                const newContent = matter.stringify(content, updatedData);
                await fs.writeFile(filePath, newContent);
                console.log(`  Updated ${filePath}`);
              } else {
                console.log(`  No changes needed for ${filePath}`);
              }

            } catch (fileError) {
              console.error(`Error processing file ${filePath}:`, fileError);
            }
          }
        }
      } else {
        console.log(`Skipping non-directory item in /src/content/: ${collectionPath}`);
      }
    }
    console.log('\n--- All files processed. ---');
  } catch (dirError) {
    console.error('Error reading content directory:', dirError);
  }
}

cleanupFrontmatter();