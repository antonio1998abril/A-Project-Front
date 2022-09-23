import React, { useContext, useEffect, useState } from "react";
import styles from "../styles/Home.module.css";

import { AuthContext } from "../context/index";
import { useRouter } from "next/router";

import withAuth from "./HOC/withAuth.jsx";
import Image from "next/image";
import NewClientButton from "../components/ModalComponents/Client/newClient";
import ClientInfo from "../components/ModalComponents/Client/getClientInfo";
import { clientService } from "../service/clientService";
import DeleteClient from "../components/ModalComponents/Client/Options/DeleteClient";

function Clients() {
  const router = useRouter();
  const state = useContext(AuthContext);
  const [callback, setCallback] = state.User.callback;
  const [infoModal, setInfoModal] = useState(false);
  const [itemMT, setItemMT] = useState();
  const [client, setClients] = useState([]);
  const { getClientList } = clientService();
  /*   const [userId] = state.User.userId */

  useEffect(() => {
    const getClient = async () => {
      const res = await getClientList(router?.query?.keyword);
      setClients(res.data);
    };

    setTimeout(() => {
      getClient();
    }, 500);
  }, []);

  return (
    <>
      <br />
      <div className="content-wrap">
        <NewClientButton />
        <br />
        <div className="gridClient">
          {client.map((item) => {
            return (
              <div key={item._id}>
                <div className="card mb-3" /* style={{ width: "40rem" }} */>
                  <Image
                    className="card-img-top"
                    width={400}
                    height={150}
                    src="https://res.cloudinary.com/antoapex19/image/upload/v1663555285/A-Project/pexels-steve-johnson-1509534_auueyi.jpg"
                    alt="Card client"
                  />
                  <div className="card-body">
                    <h5 className="card-title">Client: {item.name}</h5>
                    <div className="card-text text-center">
                      <button
                        type="button"
                        onClick={() => {
                          setInfoModal(true), setItemMT(item._id);
                        }}
                        className="btn btn-primary btn-small"
                      >
                        See more
                      </button>
                      &nbsp;
                      <button
                        type="button"
                        /*  onClick={() => setInfoModal(true)} */
                        className="btn btn-warning btn-small"
                      >
                        Update information
                      </button>
                      &nbsp;
                      <DeleteClient item={item} />
                      <ClientInfo
                        show={infoModal}
                        onHide={() => {
                          setInfoModal(false);
                        }}
                        item={itemMT}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default withAuth(Clients);
