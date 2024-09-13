# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


# Project Overview

Aconews is a news application built with React and Tailwind CSS. It fetches news articles from the GNews API and supports search functionality and pagination.

## Setup and Configuration

1. Install Dependencies

```
npm install
```

2. Build the Project

```
npm run build
```

3. Deploy to Firebase

```
firebase deploy
```

## Features

1. Fetch News

- Functionality: Retrieves news articles from the GNews API.
- Endpoint: https://gnews.io/api/v4/search
- Parameters : 
         - q: Search query
         - lang: Language (e.g., en)
         - country: Country code (e.g., us)
         - max: Number of articles per page (e.g., 10)
         - apikey: Your GNews API key
         - page: Current page number

2. Search Component

- Functionality: Allows users to search for news articles by query
- Implementation: 
        - The search input updates the query state.
        - On form submission, the query is used to fetch filtered news articles.

```
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
```

3. Pegination
- Functionality: Navigates through pages of news articles.
- Implementation: 
        - Buttons to move between pages adjust the currentPage state.
        - The fetchNews function is called with the updated currentPage to retrieve the relevant articles.

```
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

```
