import fs from  'fs';
import path from 'path';
import matter from  'gray-matter';
import { serialize } from  'next-mdx-remote/serialize'

const root = process.cwd();
/**
 * Description : Return all files in directory data
 * Se hace sincrono porque sera en tiempo de binding, no seran generados dinamicamente
 * y no habra ningun proceso bloqueante,
 * readdirSync es una funcion propia de FS
 * @returns {string[]} asdas
 */
export const getFiles = () => fs.readdirSync(path.join(root, 'data'));
export const getFile = (slug) => fs.readFileSync(path.join(root, 'data', `${slug}.mdx`), 'utf-8');

export const getFileBySlug = async (slug) => {
    const mdxSource = getFile(slug);
    const { data, content } =  await matter(mdxSource);
    const source = await serialize(content, {}) ; // aca puede ir el mdxPrims para resaltar troz de codigo
    return {
        source,
        fromMatter : {
            slug,
            ...data
        }
    }
};

export const getAllFilesMetaData = () => {
    const files = getFiles();
    return files.reduce((allPosts, postSlug) => {
        console.log(postSlug);
        const slug = postSlug.replace('.mdx', '');
        const mdxSource = getFile(slug);
        const { data } = matter(mdxSource);
        return [{...data, slug}, ...allPosts];
    }, []);
};