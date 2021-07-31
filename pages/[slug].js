import { getFileBySlug, getFiles} from '../lib/mdx'
import  { MDXRemote} from 'next-mdx-remote'
import MDXComponents from '../components/MDXComponents'
export default  function Post({source, fromMatter }) {
    return <MDXRemote {...source} components={MDXComponents} />
}

export async function getStaticProps({params}) {
    const { source, fromMatter } = await  getFileBySlug(params.slug)
    return {
        props: { source, fromMatter }
    }
}

export async function getStaticPaths(){
    const posts = await getFiles()
    const paths = posts.map((post) => ({
        params:{
            slug: post.replace(/\.mdx/, ""),
        },
    }))
    return {
        paths,
        fallback: false,
    }
}