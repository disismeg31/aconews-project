 import {useState,useEffect} from 'react';
const News = () => {

    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1); // Add page state
    const [totalPages, setTotalPages] = useState(1); // For total page count
    const [query, setQuery] = useState(''); // Add search query state

    useEffect(()=>{
        fetchNews(currentPage,query);
    },[currentPage,query])

    const fetchNews = async (page = 1 , query = '') => {
        try {
            const search = query || 'example'; 
            const response = await fetch(`https://gnews.io/api/v4/search?q=${search}&lang=en&country=us&max=6&apikey=be91e3c1c1ff2e0c1955346ed7bdf0e4&page=${page}`);
            const data = await response.json(); 
            setNews(data.articles || []);
            setTotalPages(Math.ceil(data.totalArticles / 6)); // Set total pages based on results
            setLoading(false);
        }
        catch (err){
         setError(err);
         setLoading(false); 
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setCurrentPage(1); // Reset to page 1 after search
        fetchNews(1,query);
      };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading news</div>;

   
  return (
    <div className="container mx-auto p-4 bg-[#f0edd2]">
      <h1 className="text-6xl font-bold text-center mb-4">Aconews</h1>

         {/* Search Bar */}
      <form onSubmit={handleSearch} className="mb-4 text-center">
        <input
          type="text"
          className="border rounded px-4 py-2"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search news..."
        />
        <button type="submit" className="ml-2 px-4 py-2 bg-[#90ae85] text-white rounded">
          Search
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.map((article) => (
          <div key={article.url} className="border border-[#90ae85] p-4 rounded">
            <h2 className="text-xl font-semibold text-[#383431]">{article.title}</h2>
            <p className="text-sm text-gray-500">{article.description}</p>
            <a href={article.url} className="text-blue-600 underline">
              Read More
            </a>
          </div>
        ))}
      </div>
      
      {/* Pagination */}
      <div className="flex justify-center mt-4">
        <button
          className="px-4 py-2 mx-1 bg-gray-200 border border-[#90ae85]"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="px-4 py-2">{currentPage}</span>
        <button
          className="px-4 py-2 mx-1 bg-gray-200 border border-[#90ae85]"
          onClick={() => setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

    </div>
  )
}

export default News