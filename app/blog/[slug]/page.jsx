import Image from "next/image";
import { client, urlFor } from "../../lib/sanity";
import { PortableText } from "next-sanity";

async function getData(slug) {
    const query =
    `
    *[_type == "blog" && slug.current == '${slug}']{
        "currentSlug": slug.current,
          title,
          content,
          titleImage
      }[0]
    `;
    // const query = "*[_type == 'blog'][0]" ;

    const data = await client.fetch(query);
    console.log(data);
    return data;
}


export default async function BlogArticle({params}) {

    const data = await getData(params.slug);

    return (
        <div>
            {data.title}
            
            <Image src={urlFor(data.titleImage).url()} alt="lol" width={500} height={500} priority/>

            <div className="mt-16 prose prose-blue prose-xl">
                <PortableText value={data.content} />
            </div>

        </div>
    )
}