import './App.css';
import GitHubRepoSearch from './component/GitHubRepoSearch';
import GitHubRepoDataGrid from './component/GithubRepoDataGrid';

function App() {
  return (
    <div className="App">
      <GitHubRepoSearch />

      <br/><br/>
      <GitHubRepoDataGrid />
    </div>
  );
}

export default App;
