export default function ({ store, redirect,route,router }) {
  const status = store.state.auth.loggedIn;
  if( status === false) {
    // console.log(store.state.auth.loggedIn);
    return redirect('/register')
  }
}
