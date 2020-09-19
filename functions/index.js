// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access Cloud Firestore.
const admin = require('firebase-admin');
const fetch = require('node-fetch');
const {refresh_token, client_id, client_secret} = require('./refresh_token')

admin.initializeApp();

// Take the text parameter passed to this HTTP endpoint and insert it into 
// Cloud Firestore under the path /messages/:documentId/original
exports.addMessage = functions.https.onRequest(async (req, res) => {
    // Grab the text parameter.
    const original = req.query.text;
    

    // Push the new message into Cloud Firestore using the Firebase Admin SDK.
    const writeResult = await admin.firestore().collection('messages').add({original: original});
    // Send back a message that we've succesfully written the message
    res.json({result: `Message with ID: ${writeResult.id} added.`});
  });


async function getAccessToken() {
    let refresh_token_current = refresh_token;
    
    const configDoc = admin.firestore().collection('config').doc(`config`);
    const docContent = await configDoc.get();
    if (docContent.exists) {
        const {tokens, date} = docContent.data();
        if ((new Date()).getTime() - date.toDate().getTime() < tokens.expiry * 1000 ) {
           return tokens['access_token'] 
        } else {
            refresh_token_current = tokens['refresh_token']
        }
    }


    // check if expried/exist
    // if so, return

    console.log( {refresh_token, client_id, client_secret})

    const params = new URLSearchParams();
    params.append('grant_type', 'refresh_token');
    params.append('refresh_token', refresh_token_current);

    const result = await (await fetch('https://zoom.us/oauth/token', {
        method: 'post',
        body: params, 
        headers: {
            Authorization: 'Basic '+Buffer.from(client_id + ':' + client_secret).toString('base64')

        }
    })).json()
    // console.log(result)
    await configDoc.set({tokens: result, date: new Date()});

    // store crap to the doc 
    return result['access_token'];
}

exports.getZoomLink = functions.https.onRequest(async (req, res) => {
    // Grab the text parameter.
    const groupcode = req.query.groupcode;
    const grouplink = admin.firestore().collection('zoomgroups').doc(`${groupcode}`);
    const doc = await grouplink.get();
    let link
    if (!doc.exists) {
        console.log('No such document!');
        //make a zoom link
        const result = await (await fetch('https://api.zoom.us/v2/users/me/meetings', {
            method: 'post',
            body:    JSON.stringify({
                type: 3,
                topic: "Vibecheck - " + groupcode,
                settings: {
                    join_before_host: true,
                    participant_video: true
                }
            }),
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + await getAccessToken()
             },
        })).json()

        // console.log(result)

        link = result['join_url']

        await grouplink.set({
            link
        });
        // return res.json(result)
    } else {
        link = doc.data().link
        console.log('Document data:', doc.data());
    }
    
    // Push the new message into Cloud Firestore using the Firebase Admin SDK.
    // const writeResult = await admin.firestore().collection('messages').add({original: original});
    // Send back a message that we've succesfully written the message
    res.json({zoomlink: link});
});

// Listens for new messages added to /messages/:documentId/original and creates an
// uppercase version of the message to /messages/:documentId/uppercase
// exports.makeUppercase = functions.firestore.document('/messages/{documentId}')
//     .onCreate((snap, context) => {
//       // Grab the current value of what was written to Cloud Firestore.
//       const original = snap.data().original;

//       // Access the parameter `{documentId}` with `context.params`
//       functions.logger.log('Uppercasing', context.params.documentId, original);
      
//       const uppercase = original.toUpperCase();
      
//       // You must return a Promise when performing asynchronous tasks inside a Functions such as
//       // writing to Cloud Firestore.
//       // Setting an 'uppercase' field in Cloud Firestore document returns a Promise.
//       return snap.ref.set({uppercase}, {merge: true});
//     });

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
