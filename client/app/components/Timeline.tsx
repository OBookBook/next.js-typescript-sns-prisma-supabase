import Post from "./Post";

const Timeline = () => {
  return (
    <div className="min-h-screen bg-zinc-50">
      <main className="container mx-auto py-8 px-4">
        <div className="bg-white shadow-xl rounded-xl p-6 mb-4 border border-zinc-100">
          <form>
            <textarea
              className="w-full h-32 p-4 border border-zinc-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:border-transparent transition-all  text-zinc-800 placeholder-zinc-400"
              placeholder="What's on your mind?"
            ></textarea>
            <button
              type="submit"
              className="mt-4 bg-zinc-900 hover:bg-zinc-800 duration-300 text-white font-medium py-3 px-6 rounded-lg shadow-md hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
            >
              投稿
            </button>
          </form>
        </div>
        <Post />
      </main>
    </div>
  );
};

export default Timeline;
