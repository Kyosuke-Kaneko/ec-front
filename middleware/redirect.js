export default function ({ store, redirect,route,router }) {
  // console.log('ミドルウェア', route.path);
  // console.log(redirect);
  // console.log(store.state.auth.loggedIn);
    let status = store.state.auth.loggedIn;
  if( status === false) {
      console.log(store.state.auth.loggedIn);
      return redirect('/register')
  }
}
