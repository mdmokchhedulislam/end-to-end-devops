import React from "react";
import axios from "axios";
import { Link } from "react-router";

const HomePage = () => {
  const [data, setData] = React.useState([]);
  const [refetch, setRefetch] = React.useState(false);

  const fetchAllBlogs = async () => {
    try {
      const response = await axios.get("http://www.mokchhedulislam.page.gd/api");
      console.log("response data is", response.data);

      setData(response.data.Blog || []);
    } catch (e) {
      console.log(e.message);
    }
  };

  React.useEffect(() => {
    fetchAllBlogs();
  }, [refetch]);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">
        📚 All Blogs
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {data && data.length > 0 ? (
          data.slice(0, 8).map((blog, i) => (
            <BlogCard key={i} data={blog} refetch={() => setRefetch(!refetch)} />
          ))
        ) : (
          <p className="text-gray-500 col-span-4 text-center">No blogs found</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;

const BlogCard = ({ data, refetch }) => {
  const deleteFun = async () => {
    try {
      const response = await axios.delete(`http://www.mokchhedulislam.page.gd/api/${data._id}`);
      console.log(response.data);
      refetch();
    } catch (err) {
      console.error("Delete failed:", err.message);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden transform hover:-translate-y-2 hover:shadow-2xl transition-all duration-300">
      {/* Card Header */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-4">
        <h3 className="text-lg font-bold text-white">{data?.title}</h3>
      </div>

      {/* Card Body */}
      <div className="p-5 flex w-full h-screen">
        <p className="text-gray-700 mb-2 line-clamp-2">{data?.desc}</p>
        <p className="text-gray-500 text-sm line-clamp-3">{data?.content}</p>

        {/* Buttons */}
        <div className="flex justify-between items-center mt-5">
          <button
            onClick={deleteFun}
            className="bg-red-500 text-black px-4 py-1 rounded-md text-sm hover:bg-red-600 transition duration-200"
          >
            Delete
          </button>
          <Link
            to={`/blog/${data._id}`}
            className="bg-indigo-500 text-white px-4 py-1 rounded-md text-sm hover:bg-indigo-600 transition duration-200"
          >
            View
          </Link>
        </div>
      </div>
    </div>
  );
};
