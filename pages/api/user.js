import { useEffect, useState } from "react";
import axios from "axios";


function User(token) {
  const [infoUser, setInfoUser] = useState([]);
  const [callback, setCallback] = useState(false);
  const [isManager, setIsManager] = useState(false);
  const [isCollaborator, setIsCollaborator] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const [alert, setAlert] = useState({});

  /* Search */

  const [role, setRole] = useState("");
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [itemsDashBoard, setItemsDashBoard] = useState([]);

  const [userId, setUserId] = useState("");
  const [result, setResult] = useState(0);

  const [enableSideBar,setEnableSideBar] = useState(false);

  /* Clients functionality */
const [itemsClients,setItemsClients] = useState([]);
  /* Notifications */

  const [notifications, setNotifications] = useState([]);
  /* Get all chats rooms */
  const [chatListUser, setChatListUser] = useState([]);
  const [userInfoLogged, setUserInfoLogged] = useState({});
  const [tokenAdmin,setTokenAdmin] = useState("")

  useEffect(() => {
    if (token) {
      setTokenAdmin(token)
      const getRole = async () => {
        try {
          const res = await axios.get("/api/role", {
            headers: { Authorization: token },
          });
        
           (res.data?.role === "Manager" && setIsManager(true)) ||
            (res.data?.role === "Admin" && setIsAdmin(true)) ||
            (res.data?.role === "Collaborator" && setIsCollaborator(true));
          setUserId(res.data?._id);
        } catch (err) {
          localStorage.removeItem("firstLogin");
        }
      };

      const getUser = async () => {
        try {
          const res = await axios.get(
            `/api/getAllUser?limit=${
              page * 6
            }&${role}&${sort}&email=${search}`,
            {
              headers: { Authorization: token },
            }
          );
          setItemsDashBoard(res.data.users);
          setResult(res.data.result)
        } catch (err) {
          localStorage.removeItem("firstLogin");
        }
      };

      const getClient = async () => {
        try {
          const res = await axios.get(
            `/api/getClient`,
            {
              headers: { Authorization: token },
            }
          );
          setItemsClients(res.data.result);
        } catch (err) {
          localStorage.removeItem("firstLogin");
        }
      };
      const getChatRooms = async () => {
        try {

          const res = await axios.get("/api/getChatRooms", {
            headers: { Authorization: token },
          });
        
          setChatListUser(res.data?.chatRoom);
          setUserInfoLogged(res.data);

        } catch (err) {
          console.log(err);
        }
      };
      getChatRooms()
      getRole();
      getUser();
      getClient();
     
    }
  }, [token, role, sort, search, page, callback]);

  return {
    alert: [alert, setAlert],
    infoUser: [infoUser, setInfoUser],
    isManager: [isManager, setIsManager],
    isCollaborator: [isCollaborator, setIsCollaborator],
    isAdmin: [isAdmin, setIsAdmin],
    callback: [callback, setCallback],
    role: [role, setRole],
    sort: [sort, setSort],
    search: [search, setSearch],
    page: [page, setPage],
    itemsDashBoard: [itemsDashBoard, setItemsDashBoard],
    userId: [userId],
    result: [result],
    enableSideBar:[enableSideBar,setEnableSideBar],
    notifications:[notifications, setNotifications],
    itemsClients:[itemsClients],
    /* Get all chats */
    chatListUser: [chatListUser],
    setChatListUser:[setChatListUser],
    userInfoLogged: [userInfoLogged],
    tokenAdmin: [tokenAdmin]
  };
}
export default User;
