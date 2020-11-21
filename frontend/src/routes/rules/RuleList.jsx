import React from 'react'
import styled from 'styled-components'

const RulesWrapper = styled.div`
  margin: 0% 25%;
  line-height: 1.5;
  font-size: 21px;
  li {
    margin-top: 36px;
  }
`

const LogoWrapper = styled.div`
  justify-content: center;
  display: flex;
  margin: 64px;
`

const RuleList = () => {
  return (
    <RulesWrapper>
      <LogoWrapper>
        <img src='mcav-logo.png' />
      </LogoWrapper>
      <ol>
        <li>
          <b>You need to let go of KB stats.</b>
          <p>
            If you are the kind of person that is very worried about stacking up
            KB stats and treating them as your skill in the game, you will not
            enjoy your time here. That kind of mentality leads to risk
            adversion, which leads to less content. We try and focus on getting
            as many fights as possbile. The general philosophy is that fights
            are fun, so lets maximize fights. KB stats are putting pressures on
            you that are not netting you any fun. So screw it, focus instead on
            dank frags.
          </p>
        </li>
        <li>
          <b>You need to be prepared.</b>
          <p>
            You need to be able to fly at LEAST 2 ships from each doctrine at
            all times. This is our most important rule. By having at least 2
            ships from each doctrine available to be flown at all times, it
            allows you as a member to be ready to join in on fleets whenever we
            ping for them. It also allows us to know that our members are ready
            to go and we will be able to form an effective fleet. The two ship
            rule works best if you pick one DPS and one support ship, however if
            this is not possible and combination of 2 ships is acceptable. If
            you can fly an alliance provided ship, this does count as one of the
            two ships you can fly (for example, if you can fly a Guardian and a
            Damnation, you would buy and bring in the Damnation yourself, but
            not the Guardian, because the Guardian is provided by the Alliance).
          </p>
        </li>
        <li>
          <b>You need to be on out of game services</b>
          <p>
            We use several out of game tools: Slack, Teamspeak, Pathfinder Slack
            is our out of game communication tool, we use it for pings. #updates
            is the only required channel in slack. That is where you will find
            pings. Teamspeak we use for voice communications.
          </p>
        </li>
        <li>
          <b>You have the power to do anything</b>
          <p>
            Every pilot in the alliance has the power to do what you want. You
            can ping, you can use corp assets, you can lead fleets, you can sell
            doctrines. Hell we even have a guy that leads highsec ganking ops. I
            will never let anyone get in the way of someone trying to create
            content. I dont believe in a lot of internet space titles to make
            people feel internet space important. If you want to do
            something,... go for it! If you want to alliance fund something....
            ask me! it can be your first day and we will take you seriously.
          </p>
        </li>
        <li>
          <b>You have the right to do nothing</b>
          <p>
            However, everything is optional. If you dont want to go on a fleet,
            you dont have to. If you would rather keep doing pve or watch porn,
            thats fine. Nobody ever will CTA you. If you want to be a ping
            warrior and contribute jack shit otherwise, thats totally fine, Just
            remember it is you making that choice. Dont expect the content to be
            what you want, if you arent doing anything to help shape it.
          </p>
        </li>
        <li>
          <b>If you are causing drama, you are gone.</b>
          <p>
            We all gotta work together. Be careful in comms talking about
            politics or anything controversial. We have people from all over the
            world in this alliance, you really dont know who you might
            offend/start something with. If something does happen, kiss and make
            up, i dont fucking care. Whatever it is, fix it. Becuase if
            leadership has to get involved, it is not going to go well for any
            of you. A lot of this goes for when Eve Online (man greatest
            frustration simulator has got you down). We can not tolerate
            inflammatory people that cause drama when things don't go well.
          </p>
        </li>
        <li>
          <b>You will never be kicked for being bad at PvP</b>
          <p>
            I cant believe people get kicked for this crap. As far as im
            concered, everyone is bad. This is why i spend all this time sending
            out educational material and trying to help people be their own
            pilots. Eve PvP is hard and often put you in some really unfair
            situations. I dont care how bad you are, we will make you better. So
            again, dont sweat the losses, nobody cares of isk-eff. Just dont
            whelp shit in highsec to ganks/wardecs, and everything is going to
            be ok.
          </p>
        </li>
        <li>
          <b>Talking in local</b>
          <p>
            I am not going to tell what you can and cannot say but let me at
            least say this. We are focused on getting fights here in MCAV,
            whatever it takes to get a fight, we want to do. So think twice
            about what you say in local, I dont care about dick waving as much
            as I do getting PvP. In general being nice to wormhole groups and
            talking complete cancer in kspace works the best but.... think about
            it, ur a smart guy, dont cost everyone a fight becuase you want to
            just spew cancer.
          </p>
        </li>
        <li>
          <b>Going afk from game</b>
          <p>
            Real life happened and you need to "not eve" for a while. 1. let
            leadership know. 2. stay active on slack. at least say hi or post
            memes. We understand, and you will not be kicked from corp for
            taking a break. If you fall off the face of the planet you will be
            kicked from the alliance but of course allowed to rejoin.
          </p>
        </li>
        <li>
          <b>PvP loot goes to the alliance</b>
          <p>
            After a big fight or operation, all the loot that we pick up is to
            be delivered to the loot hanger. (in the Alliance MOTD). This will
            be used to fund all the alliance provided doctrine ships as well as
            other things. If you are doing dank solo PvP, you are allowed to
            keep that loot for yourself. But any PvP that involves more than 2
            people automatically requires the loot to go to the alliance.
          </p>
        </li>
      </ol>
    </RulesWrapper>
  )
}

export default RuleList
