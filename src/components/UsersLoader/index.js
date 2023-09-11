import React, { Component } from 'react';

class UsersLoader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      isLoading: false,
      page: 1,
      isError: false,
      nationality: 'ua',
    }
    console.log('constructor');
  }

  handleNationalityChange = (event) => {
    const selectedNationality = event.target.value;
    this.setState({ isLoading: true, nationality: selectedNationality });

    this.setState({ users: [] });

    fetch(`https://randomuser.me/api/?results=10&nat=${selectedNationality}&seed=foobar&page=1`)
      .then((response) => response.json())
      .then((data) =>
        this.setState({
          users: data.results,
          isLoading: false,
          page: 1,
        })
      )
      .catch((error) =>
        this.setState({
          isError: true,
          isLoading: false,
        })
      );
  };



  componentDidMount() {
    console.log('componentDidMount');
    this.setState({ isLoading: true });
    const { page } = this.state;
    fetch(`https://randomuser.me/api/?results=10&nat=ua&seed=foobar&page=${page}`)
      .then(response => response.json())
      .then(data => this.setState({
        users: data.results,
      }))
      .catch(error => this.setState({
        isError: true,
      }))
      .finally(() => this.setState({
        isLoading: false
      }));
    // this.setState({ isLoading: false });

  }
  componentDidUpdate(prevProps, prevState) {
    console.log('componentDidUpdate');
    console.log('prev page: ', prevState);
    console.log('current page: ', this.state);
    if (this.state.page === prevState.page) {
      return;
    }
    this.setState({ isLoading: true });
    const { page } = this.state;
    fetch(`https://randomuser.me/api/?results=10&nat=ua&seed=foobar&page=${page}`)
      .then(response => response.json())
      .then(data => this.setState({
        users: data.results,
      }))
      .catch(error => this.setState({
        isError: true,
      }))
      .finally(() => this.setState({
        isLoading: false
      }));
  }
  prevPage = () => {
    this.setState({ page: this.state.page - 1 })
  }
  nextPage = () => {
    this.setState({ page: this.state.page + 1 })
  }
  render() {
    console.log('render');
    const { users, isLoading, page, isError } = this.state;
    if (isLoading) {
      return <p>Loading....</p>
    }
    if (isError) {
      return <p>Error...</p>
    }
    return (
      <section>
        <h2>Users List:</h2>
        <select value={this.state.nationality} onChange={this.handleNationalityChange}>
          <option value="ua">Українці</option>
          <option value="us">Американці</option>
          <option value="fr">Французи</option>
        </select>
        <button disabled={page === 1} onClick={this.prevPage}>{"<"}</button>
        <span>page:{page}</span>
        <button onClick={this.nextPage}>{">"}</button>
        <ul>
          {users.map(u => <li key={u.login.uuid}>{u.name.first} {u.name.last}</li>)}
        </ul>
      </section>
    );
  }
}

export default UsersLoader;










