
import React, { useState, useMemo } from 'react'
import styled from 'styled-components'
import TinderCard from 'react-tinder-card'


import LottieView from 'lottie-react-native';


const CardContainer = styled.View`
    flex: 15;
    width: 100%;
    height: 100%;
    background-color: #fff;
`

const Card = styled.View`
    position: absolute;
    background-color: #fff;
    top: 10px;
    left: 10px;
    width: 95%;
    height: 570px;
    shadow-color: black;
    shadow-opacity: 0.1;
    shadow-radius: 10px;
    border-radius: 10px;
    resize-mode: cover;
    
`

const CardImage = styled.ImageBackground`
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-radius: 10px;
`

const CardTitle = styled.Text`
    position: absolute;
    bottom: 0;
    margin: 10px;
    color: #fff;
`

const db = [
    {
      name: 'Richard Hendricks',
      img: require('../public/imgs/richard.jpg')
    },
    {
      name: 'Erlich Bachman',
      img: require('../public/imgs/erlich.jpg')
    },
    {
      name: 'Monica Hall',
      img: require('../public/imgs/monica.jpg')
    },
    {
      name: 'Jared Dunn',
      img: require('../public/imgs/jared.jpg')
    },
    {
      name: 'Dinesh Chugtai',
      img: require('../public/imgs/dinesh.jpg')
    }
  ]
  
  const alreadyRemoved = []
  let charactersState = db 

export default function CardPage({ navigation }) {

    const [characters, setCharacters] = useState(db)
    const [lastDirection, setLastDirection] = useState()

    const childRefs = useMemo(() => Array(db.length).fill(0).map(i => React.createRef()), [])

    const swiped = (direction, nameToDelete) => {
        console.log('removing: ' + nameToDelete + ' to the ' + direction)
        setLastDirection(direction)
        alreadyRemoved.push(nameToDelete)
    }

    const outOfFrame = (name) => {
        console.log(name + ' left the screen!')
        charactersState = charactersState.filter(character => character.name !== name)
        setCharacters(charactersState)
    }

    const swipe = (dir) => {
        const cardsLeft = characters.filter(person => !alreadyRemoved.includes(person.name))
        if (cardsLeft.length) {
        const toBeRemoved = cardsLeft[cardsLeft.length - 1].name // Find the card object to be removed
        const index = db.map(person => person.name).indexOf(toBeRemoved) // Find the index of which to make the reference to
        alreadyRemoved.push(toBeRemoved) // Make sure the next card gets removed next time if this card do not have time to exit the screen
        childRefs[index].current.swipe(dir) // Swipe the card!
        }
    }
    return(
    <CardContainer>
        {alreadyRemoved.length ===5  && 
          <LottieView source={require('../public/imgs/scanning.json')} autoPlay loop speed={0.9} />
        }
        {characters.map((character) =>
          <TinderCard key={character.name} onSwipe={(dir) => swiped(dir, character.name)} onCardLeftScreen={() => outOfFrame(character.name)}>
            <Card>
              <CardImage source={character.img}>
                <CardTitle>{character.name}</CardTitle>
              </CardImage>
            </Card>
          </TinderCard>
        )}
    </CardContainer>
    )
}