import UserListItem from "./UserListItem";

export default function UserList({ uids, getDetailsFromUID }) {
  return (
    <div className="content-item flex flex-col">
      {uids && uids.map(uid => <UserListItem key={uid} uid={uid} getDetailsFromUID={getDetailsFromUID} /> )}
    </div>
  );
};