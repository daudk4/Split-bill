import { useState } from 'react';

const initialFriends = [
  {
    id: 118836,
    name: 'Clark',
    image: 'https://i.pravatar.cc/48?u=118836',
    balance: -7,
  },
  {
    id: 933372,
    name: 'Sarah',
    image: 'https://i.pravatar.cc/48?u=933372',
    balance: 20,
  },
  {
    id: 499476,
    name: 'Anthony',
    image: 'https://i.pravatar.cc/48?u=499476',
    balance: 0,
  },
];

export default function App() {
  const [selected, setSelected] = useState(null);
  const [expense, setExpense] = useState('');
  const [userShare, setUserShare] = useState(null);
  const [whoPaid, setWhoPaid] = useState('user');
  const [whoOwe, setWhoOwe] = useState(false);

  let friendShare = expense ? expense - userShare : '';

  function handleClick(friend) {
    setSelected(friend);
  }

  function handleOwe() {
    setWhoOwe((s) => !s);
  }

  return (
    <div className='app'>
      <FriendList
        onHandle={handleClick}
        whoPaid={whoPaid}
        whoOwe={whoOwe}
        userShare={userShare}
        friendShare={friendShare}
      />

      {selected && (
        <SplitBill
          selected={selected}
          expense={expense}
          onSetExpense={setExpense}
          userShare={userShare}
          onSetUserShare={setUserShare}
          friendShare={friendShare}
          whoPaid={whoPaid}
          onSetWhoPaid={setWhoPaid}
          onHandleOwe={handleOwe}
        />
      )}
    </div>
  );
}

//FriendList Component
function FriendList({ onHandle, whoPaid, whoOwe, userShare, friendShare }) {
  const friends = initialFriends;
  return (
    <div className='friendlist'>
      {friends.map((friend) => (
        <Friend
          friend={friend}
          onHandle={onHandle}
          whoPaid={whoPaid}
          whoOwe={whoOwe}
          userShare={userShare}
          friendShare={friendShare}
        />
      ))}
    </div>
  );
}

//Friend Component
function Friend({ friend, onHandle, whoPaid, whoOwe, userShare, friendShare }) {
  return (
    <div className='friend'>
      <img src={friend.image} alt=''></img>
      <div>
        <h3>{friend.name}</h3>
        {whoOwe && whoPaid === 'user' && (
          <p className='green'>
            {whoPaid} owe you ${friendShare}
          </p>
        )}
        {whoOwe && whoPaid === friend.name && (
          <p className='red'>
            You owe {whoPaid} ${userShare}
          </p>
        )}
        {friend.balance < 0 && (
          <p className='red'>
            You owe {friend.name} ${Math.abs(friend.balance)}
          </p>
        )}
        {friend.balance > 0 && (
          <p className='green'>
            {friend.name} owe you ${Math.abs(friend.balance)}
          </p>
        )}
        {friend.balance === 0 && <p className='grey'>You both are even</p>}
      </div>
      <Button onHandler={() => onHandle(friend)}>Select</Button>
    </div>
  );
}

//SplitBill Component
function SplitBill({
  selected,
  expense,
  onSetExpense,
  userShare,
  onSetUserShare,
  friendShare,
  whoPaid,
  onSetWhoPaid,
  onHandleOwe,
}) {
  return (
    <div className='splitbill'>
      <div className='row'>
        <label>Bill value</label>
        <input
          type='number'
          value={expense}
          onChange={(e) => onSetExpense(Number(e.target.value))}
        ></input>
      </div>

      <div className='row'>
        <label>Your expense</label>
        <input
          type='text'
          value={userShare}
          onChange={(e) =>
            onSetUserShare(
              Number(e.target.value) > expense
                ? userShare
                : Number(e.target.value)
            )
          }
        ></input>
      </div>

      <div className='row'>
        <label>{selected.name} expense</label>
        <input type='text' disabled value={friendShare}></input>
      </div>

      <div className='row'>
        <label>Who is paying the bill?</label>
        <select value={whoPaid} onChange={(e) => onSetWhoPaid(e.target.value)}>
          <option value='user'>You</option>
          <option value={selected.name}>{selected.name}</option>
        </select>
      </div>

      <Button onHandler={() => onHandleOwe()}>Split bill</Button>
    </div>
  );
}

//BUTTON COMPONENT:

function Button({ children, onHandler }) {
  return <button onClick={onHandler}>{children}</button>;
}
