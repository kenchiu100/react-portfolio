import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import sanityClient from "../client.js"
import BlockContent from "@sanity/block-content-to-react"

export default function SinglePost() {
    const [singlePost, setSinglePost] = useState(null);
    const { slug } = useParams();

    useEffect(() => {
        sanityClient.fetch(`*[slug.current == "${slug}"]{
            title,
            _id,
            slug,
            mainImage{
                asset->{
                    _id,
                    url
                }
            },
            demoImage{
                asset->{
                    _id,
                    url
                }
            },
            body,
            "name": author->name,
            "authorImage": author -> image
        }`).then((data) => setSinglePost(data[0])).catch(console.error);
    }, [slug]);

    if(!singlePost) return <div>Loading...</div>;

    return (
        <main className="bg-gray-200 min-h-screen p-12">
            <article className="container shadow-lg mx-auto bg-green-100 rounded-lg">
                <h1 className="flex items-center justify-center cursive text-3xl lg:text-6xl mb-4 pt-10">{singlePost.title}</h1>
                <div className="grid grid-cols-6 gap-4 mx-10 py-12">
                    <div></div>
                        <div className="col-span-2"><img src={singlePost.mainImage.asset.url} alt={singlePost.title}></img></div>
                        <div className="col-span-2"><img src={singlePost.demoImage.asset.url} alt={singlePost.title}></img></div>
                    <div></div>
                </div>
                <div className="px-16 lg:px-48 pb-20 prose lg:prose-xl max-w-full">
                    <BlockContent blocks={singlePost.body} projectId="8vsos0yj" dataset="production"/>
                </div>
            </article>
        </main>
    );
}