import React, {useState} from "react";
import axios from 'axios';

export default function GitHubRepoSearch() {

    // 키워드 상태(state) 선언
    const [keyword, setKeyword] = useState('');
    // 레파지토리 상태 선언
    const [repositories, setRepositories] = useState([]);
    // 오류 상태 선언
    const [error, setError] = useState(null);

    // 깃허브 레파지토리 검색 함수(화살표 함수 버전)
    const searchRepositories = () => {
        alert('searchRepositories')
        // 아래 파라미터에 백틱(`) 사용됨.
        axios.get(`https://api.github.com/search/repositories?q=${keyword}`)
        .then((response) => {
            //setRepositories(response.data.items);
            console.log(response) // 응답데이터 (원본)
            // 서버로부터 받은 JSON 형식의 데이터를 JavaScript
            // 객체로 변환한 결과
            // 응답 데이터(원본에서 data속성 추출)
            const responseData = response.data;
            console.log(responseData)
            // 응답 데이터의 data 속성에서 'items' 속성값 추출
            const items = responseData.items;
            console.log(items)
            // 'repositories' 상태 업데이트
            setRepositories(items);
            // error 상태 업데이트
            setError(null);
        })
        .catch((error) => {
            setRepositories([]);
            setError(error.message);
        });
    };

    // 깃허브 레파지토리 검색 함수(일반 자바스크립트 버전)
    /*
    function searchReopsotories() {
        axios.get('https://api.github.com/search/repositories?q=' + keyword)
        .then(function(response){
            setRepositories(response.data.items);
            setError(null);
        })
        .catch(function(error) {
            setRepositories([]);
            setError(error.message);
        });
    };
    */
   return (
    <div>
        <h1>Github Repository Search</h1>
        <input type="text" value={keyword} onChange={(e) => setKeyword(e.target.value)}
        placeholder="검색할 레파지토리 입력"
        />
        <button onClick={searchRepositories}>Search</button>
        {error && <p>Error: {error}</p>}
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>URL</th>
                </tr>
            </thead>
            <tbody>
            {/* 레파지토리 상태가 변경되면 현재 컴포넌트의 UI가 업데이트됨. 즉, 새로 그려짐(아래 표가 새로 렌더링) */}
                {repositories.map((repo) => (
                    <tr key={repo.id}>
                        <td>{repo.id}</td>
                        <td>{repo.name}</td>
                        <td>{repo.description}</td>
                        <td>
                            <a href={repo.html_url} target="_blank" rel="">
                                {repo.html_url}
                            </a>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
   );
}