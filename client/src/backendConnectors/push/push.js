import * as PushAPI from "@pushprotocol/restapi";
import * as ethers from "ethers";

export async function push(status,from,to){

    const PK = '3e4446e56aba7358beb2cdac973fe690af36d407bc52f9a73fc4fa80e838f57b'; // channel private key
    const Pkey = `0x${PK}`;
    const signer = new ethers.Wallet(Pkey);

    if(status=="sign"){

    const apiResponse = await PushAPI.payloads.sendNotification({
        signer,
        type: 3, // target
        identityType: 2, // direct payload
        notification: {
          title: `Bequest Protocol😊`,
          body: `New message from Bequest Protocol`
        },
        payload: {
          title: `WOW! You Have Been Added As Benificary By ${from} 😊`,
          body: `Go to Bequest Protocol Benifiary's Section to See Details`,
          cta: '',
          img: '' 
        },
        recipients: `eip155:5:${to}`, // recipient address
        channel: 'eip155:5:0xb34902Df06A50867846A68B78eD31C3bbA7761F5', // your channel address
        env: 'staging'
      });

    }
    if(status=="change"){

    const apiResponse = await PushAPI.payloads.sendNotification({
        signer,
        type: 3, // target
        identityType: 2, // direct payload
        notification: {
          title: `Bequest Protocol😊`,
          body: `New message from Bequest Protocol`
        },
        payload: {
          title: `One UPDATE! in your Benificary's Section`,
          body: `Go to Bequest Protocol Benifiary's Section to See Details`,
          cta: '',
          img: '' 
        },
        recipients: `eip155:5:${to}`, // recipient address
        channel: 'eip155:5:0xb34902Df06A50867846A68B78eD31C3bbA7761F5', // your channel address
        env: 'staging'
      });

    }


}