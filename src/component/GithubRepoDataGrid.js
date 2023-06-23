import React, { useState } from 'react';
import axios from 'axios';
import 'react-data-grid/lib/styles.css';
import DataGrid from 'react-data-grid';

// 화면 리사이징 오류 발생 해결
window.ResizeObserver = undefined;

export default function GitHubRepoDataGrid() {

  const [keyword, setKeyword] = useState('');
  const [repositories, setRepositories] = useState([]);
  const [error, setError] = useState(null);

  const searchRepositories = () => {
    axios
      .get(`https://api.github.com/search/repositories?q=${keyword}`)
      .then((response) => {
        const responseData = response.data; 
        console.log(responseData)
      // 응답 데이터의 data 속성에서'items' 속성값 추출
        const items = responseData.items; 
        console.log(items)
        // 'repositories' 상태 업데이트
        setRepositories(items);
        setError(null);
      })
      .catch((error) => {
        setRepositories([]);
        setError(error.message);
      });
  };

  // react-data-grid 컬럼 정의
  const columns = [
    { key: 'id', name: 'ID' },
    { key: 'name', name: 'Name' },
    { key: 'html_url', name: 'URL' },
  ];

  // const rows = [
  //   { id: 0, title: 'Example' },
  //   { id: 1, title: 'Demo' }
  // ];

  return (
    <div>
      <h1>GitHub Repository Search</h1>
      <input type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Enter keyword"
      />
      <button onClick={searchRepositories}>Search</button>
      {error && <p>Error: {error}</p>}
      <DataGrid columns={columns} rows={repositories} />
    </div>
  );
}