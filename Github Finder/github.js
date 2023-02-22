class Github{
    constructor(){
        this.client_id = 'c77a50f1d286b9bf93ed';
        this.client_secret = '5e5f4da1bc476b866aaeb4431e5ab422bb2e382c';
        this.repo_count = 5;
        this.repo_sort = 'created: asc';
    }

    async getUser(user){
        const profileResponse = await fetch(`https://api.github.com/users/${user}?client_id${this.client_id}?client_secret${this.client_secrte}`);
        const repoResponse = await fetch(`https://api.github.com/users/${user}/repos?per_page=${this.repo_count}&sort=${this.repo_sort}client_id${this.client_id}?client_secret${this.client_secrte}`);
        
        const profile = await profileResponse.json();
        const repos = await repoResponse.json();
        return{
            profile,
            repos
        }
    }
}