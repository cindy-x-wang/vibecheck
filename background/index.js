const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");
const { v4: uuidv4 } = require('uuid');

// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
    apiKey: "AIzaSyAY8N97fSGhk89Ik-Hx4S1biySFxu7Qq9k",
    authDomain: "vibecheck-hack.firebaseapp.com",
    databaseURL: "https://vibecheck-hack.firebaseio.com",
    projectId: "vibecheck-hack",
    storageBucket: "vibecheck-hack.appspot.com",
    messagingSenderId: "81464280508",
    appId: "1:81464280508:web:f1186c2d5d69029bba57b9",
    measurementId: "G-R2RSLJWTYT"
});

const db = firebase.firestore();

let groupListening = []
let latestGroupData = {}

let userId;

function registerVibeGroups() {
    chrome.storage.sync.get(['userId', 'groupnames'], function(result) {
        if (!result.userId) {
            // register user 
            userId = uuidv4(); 
            console.log('New user. Assigning user id', userId)
            chrome.storage.sync.set({
                userId
            })
        } else {
            console.log('Tser id', userId)
            userId = result.userId
        }
        console.log('Enrolled in ', result.groupnames);
        if (result.groupnames === undefined) {
            return
        }
        for (const groupname of result.groupnames) {
            if (groupListening.includes(groupname)) {
                continue;
            }
            groupListening.push(groupname);
            db.collection("zoomgroups").doc(groupname)
            .onSnapshot(function(doc) {
                const data = doc.data();
                console.log(groupname, data);
                latestGroupData[groupname] = data;
                const available = data.available;
                const everyone = data.everyone;
                if (!available || !everyone) {
                    return
                }
                if (available.length / everyone.length > 0.7) {
                    // let's vibe!!!
                    chrome.notifications.create(groupname, {
                        type: 'basic',
                        title: `${data.groupName} has ${available.length} people!`,
                        message: 'Come vibe 😎 click me~',
                        buttons: [{
                            title: 'vibeeee rn'
                        },
                        {
                            title: 'unsubscribe'
                        }],
                        //todo: this image is ugly af. fix
                        iconUrl: "data:image/jpeg;base64,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"
                    }, function (notificationId) {
                        console.log('Notification triggered', notificationId)
                    })
                }
            });
        }
        // check for removals 
        // there gotta be a bigger brain way to do this but eh heck
        for (const groupNameWeAreListeningRn of groupListening) {
            if (!result.groupnames.includes(groupNameWeAreListeningRn)) {
                groupListening.splice(groupListening.indexOf(groupNameWeAreListeningRn))
            }
        }
    });
}

chrome.storage.onChanged.addListener(function (changes, areaname) {
    if (areaname !== "sync") {
        return;
    }
    registerVibeGroups();
})

    
chrome.notifications.onClicked.addListener(handleVibe);
chrome.notifications.onButtonClicked.addListener(handleVibe);

async function handleVibe(notificationId, buttonIndex = 0) {
    chrome.notifications.clear(notificationId)
    if (buttonIndex === 1) {
        // oh noes, unsubscribe
        await unsubscribe(notificationId)
    }
    console.log(latestGroupData, notificationId)
    if (!groupListening.includes(notificationId)) {
        // un-listened
        console.log(notificationId, 'unlistened')
    }
    chrome.windows.create({
        url: latestGroupData[notificationId].link
    })
    
}

async function unsubscribe(groupname) {
    console.log('Unsubscribe request', notificationId)
    const groupRef = db.collection("zoomgroups").doc(groupname)
    // must unvibe first before reduce everyone, to prevent false notifications for others 
    await unvibeGroup(groupName)

    await groupRef.update({
        "everyone": firebase.firestore.FieldValue.arrayRemove(userId)
    });

    chrome.storage.sync.get(['groupnames'], function (result) {
        const newGroups = result.groupnames
        newGroups.splice(newGroups.indexOf(groupname), 1)
        chrome.storage.sync.set({
            groupnames: newGroups
        }, function() {
            registerVibeGroups()
        })
    })

    console.log('Unsubscribe processed', notificationId)
}

async function changeName(newName) {
    const userRef = db.collection("users").doc(userId);
    userRef.get().then((doc) => {
      if(doc.exists) {
        userRef.set({
          name: newName
        });
      }
    })
}

async function subscribe(groupname) {
    const groupRef = db.collection("zoomgroups").doc(groupname)

    await groupRef.update({
        "everyone": firebase.firestore.FieldValue.arrayUnion(userId)
    });

    chrome.storage.sync.get(['groupnames'], function (result) {
        chrome.storage.sync.set({
            groupnames: [...result.groupnames, groupname]
        }, function() {
            registerVibeGroups()
        })
    })

    await vibeGroup(groupname)
}

async function unvibeGroup(groupname) {
    const groupRef = db.collection("zoomgroups").doc(groupname)
    await groupRef.update({
        "available": firebase.firestore.FieldValue.arrayRemove(userId)
    });
}

async function vibeGroup(groupname) {
    const groupRef = db.collection("zoomgroups").doc(groupname)
    await groupRef.update({
        "available": firebase.firestore.FieldValue.arrayUnion(userId)
    });
}

async function vibeAll() {
    for (const groupname of groupListening) {
        await vibeGroup(groupname)
    }
}

async function unVibeAll() {
    for (const groupname of groupListening) {
        await unvibeGroup(groupname)
    }
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
      if (request.audience !== "background") {
          return
      }
      switch (request.operation) {
          case 'setAvailabilty': 
            if (request.data.available) {
                vibeAll()
            } else {
                unVibeAll()
            }
            break;
          case 'subscribe': 
            subscribe(request.data.groupname);
            break;
          case 'unsubscribe':
              unsubscribe(request.data.groupname);
              break;
          case 'changeName':
              changeName(request.data.newName);
              break;
          default: 
            throw new Error('Unknown operation ' + request.operation)
      }
});

registerVibeGroups();