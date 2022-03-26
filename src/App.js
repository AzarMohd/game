import React,{useState,useEffect} from 'react';
import Header from './components/Header';
import Figure from './components/Figure';
import "./App.css";
import WrongLetters from './components/WrongLetters';
import Word from './components/Word';
import Notification from "./components/Notification";
import Popup from "./components/Popup";
import { showNotification as show } from './components/helpers/helper';

const words = ['manchester city','liverpool','chelsea','arsenal','tottenham','manchester united','west-ham','wolves','aston villa',
'leicester city','southampton','crystal-palace','brighton','newcastle','brentford','leeds-united','everton','watford','burnley','norwich-city'];

let selectedWord = words[Math.floor(Math.random() * words.length)];




function App() {
  const[playable,setPlayable]=useState(true);
  const[correctLetters,setCorrectLetters]=useState([]);
  const[wrongLetters,setWrongLetters]=useState([]);
  const[showNotification,setshowNotification]=useState(false);

  useEffect(()=>{
      const handleKeydown = event =>{
        const{key,keyCode}=event;

          if (playable && keyCode >= 65 && keyCode <= 90) {
            const letter = key.toLowerCase();
      
            if (selectedWord.includes(letter)) {
              if (!correctLetters.includes(letter)) {
                setCorrectLetters(currentLetters=>[...currentLetters,letter]);
              } else {
                show(setshowNotification);
              }
            } else {
              if (!wrongLetters.includes(letter)) {
                setWrongLetters(wrongLetters=>[...wrongLetters,letter]);
              } else {
                show(setshowNotification);
              }
            }
          }
        }
        window.addEventListener('keydown', handleKeydown)
        return() => window.removeEventListener("keydown",handleKeydown);
      },[correctLetters,wrongLetters,playable]);
      
  function playAgain(){
    setPlayable(true);
    //Empty Arrrays
    setCorrectLetters([]);
    setWrongLetters([]);


    const random=Math.floor(Math.random() * words.length);
    selectedWord=words[random];

  }

 
  
  return (
    <div >
     <Header />
     <div className='game-container' >
       <Figure wrongLetters={wrongLetters} />
       <WrongLetters wrongLetters={wrongLetters} />
       <Word selectedWord={selectedWord} correctLetters={correctLetters} />
     </div>
       <Popup correctLetters={correctLetters} wrongLetters={wrongLetters} setPlayable={setPlayable} selectedWord={selectedWord}
       playAgain={playAgain} />
       <Notification showNotification={showNotification} />
    </div>
  );
}

export default App;
