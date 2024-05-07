import Image from "next/image";
import Navbar from "./components/Navbar";
import { client, urlFor } from "./lib/sanity";
import Link from "next/link";




async function getData() {
  const query =
  `
  *[_type == 'blog'] | order(_createdAt desc) {
    title,
      smallDescription,
      "currentSlug":slug.current,
      titleImage
  }
  `

  const data = await client.fetch(query);
  console.log("@@@ Sent Fetch Request")
  return data;
}


export default async function Home() {

  const data = await getData();

  console.log(data);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 mt-5 gap-5">
        {data.map((blog, idx) => (
          <div key={idx} >
            <Image 
            width={500}
            height={500}
            className="rounded-t-lg h-[200px] object-cover"
            src={urlFor(blog.titleImage).url()} 
            alt="lol" />
            <h3 className="text-lg line-clamp-2">{blog.title}</h3>
            <p className="line-clamp-3 text-sm mt-2 text-grey-600">{blog.smallDescription}</p>
            <button className="bg-primary text-white px-4 py-2 mt-2 rounded-lg">
              <Link href={`/blog/${blog.currentSlug}`}>Read More</Link>
            </button>
          </div>
        ))}
     
    </div>
  );
}
