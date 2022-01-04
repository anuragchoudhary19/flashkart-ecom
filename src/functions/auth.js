// export const handleDemoLogin = async () => {
//   setLoading(true);
//   try {
//     const result = await auth.signInWithEmailAndPassword(demoEmail, demoPassword);
//     const { user } = result;
//     console.log(result);
//     const idTokenResult = await user.getIdTokenResult();
//     console.log(idTokenResult);

//     createOrUpdateUser(idTokenResult.token)
//       .then((res) => {
//         console.log(res.data);
//         window.localStorage.setItem(
//           'user',
//           JSON.stringify({
//             name: res.data.name,
//             email: res.data.email,
//             token: idTokenResult.token,
//             role: res.data.role,
//             _id: res.data._id,
//           })
//         );
//         dispatch({
//           type: 'LOGGED_IN_USER',
//           payload: {
//             name: res.data.name,
//             email: res.data.email,
//             token: idTokenResult.token,
//             role: res.data.role,
//             _id: res.data._id,
//           },
//         });
//       })
//       .then(() => {
//         setIsOpen('');
//       })
//       .catch((err) => {
//         message.error('Server Error');
//       });
//     setLoading(false);
//   } catch (error) {
//     if (error.code === 'auth/user-not-found') {
//       message.error('Email is not registered');
//     }
//     if (error.code === 'auth/wrong-password') {
//       message.error('Password do not match');
//     }
//     setLoading(false);
//   }
// };
