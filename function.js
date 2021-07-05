import NetInfo from '@react-native-community/netinfo';


export const checkConnected=()=>{
   return NetInfo.fetch().then(state => {
        console.log(state);
        return state.isInternetReachable
   })
}
