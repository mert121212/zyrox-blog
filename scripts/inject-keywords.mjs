import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const postsDir = path.resolve(__dirname, '..', 'app', 'posts');

const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'));

let updatedCount = 0;

for (const file of files) {
    const filePath = path.join(postsDir, file);
    const raw = fs.readFileSync(filePath, 'utf8');
    const parsed = matter(raw);
    
    // Only update if keywords are missing
    if (!parsed.data.keywords || parsed.data.keywords.length === 0) {
        
        // Generate pseudo-keywords based on tags and title
        const titleWords = parsed.data.title.toLowerCase().replace(/[^a-z0-9 ]/g, '').split(' ').filter(w => w.length > 3);
        const tags = parsed.data.tags ? parsed.data.tags.map(t => t.toLowerCase()) : [];
        const category = parsed.data.category ? parsed.data.category.toLowerCase() : '';
        
        // Combine and take top 4-5 unique
        let generatedKeywords = [...new Set([...tags, category, ...titleWords])].filter(k => k.length > 2).slice(0, 5);
        
        // If we have less than 3, add some generic ones
        if (generatedKeywords.length < 3) {
            generatedKeywords.push('pc build', 'hardware guide', 'tech tips');
        }
        
        parsed.data.keywords = generatedKeywords;
        
        // Re-stringify with gray-matter
        const newRaw = matter.stringify(parsed.content, parsed.data);
        fs.writeFileSync(filePath, newRaw, 'utf8');
        updatedCount++;
    }
}

console.log(`Successfully added keywords to ${updatedCount} articles.`);
