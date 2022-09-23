import React, { useContext, useState } from "react";
import { Navbar, Nav, Container, Image, NavDropdown, Button } from "react-bootstrap";
import Link from "next/link";
import Router from "next/router";
import { loginService } from "../../service/loginService";
import withAuth from "../../pages/HOC/withAuth";
import { AuthContext } from "../../context";

function Index() {
  const [sizeBel, setSizeBell] = useState(50);
  const { getLogOut } = loginService();
  const state = useContext(AuthContext);
  const [isManager] = state.User.isManager;

  const [userId] = state.User.userId

  const logoutUser = async () => {
    await getLogOut()
      .then(function (e) {
        Router.push("/");
      })
      .catch(function (e) {
        console.log("error");
      });
  };

  const kanbaLink = (userId) => {
    Router.push({
      pathname: `/${userId}`,
      query: { keyword: userId },
    });
  };

  return (
    <>
      <Navbar className="borderHeader" expand="lg" variant="light" sticky="top">
        <Container>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />

          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Navbar.Brand href="/">
                <Image
                  src="/logoClip.png"
                  alt=" A-Project"
                  className="MagNet ubuntu"
                />
                A-Project
              </Navbar.Brand>

              <Nav.Link href="/" className="fontNavBar ">
                Home
              </Nav.Link>
              {isManager && (
                <>
                {/* <Nav.Link href="/clients" className="fontNavBar ">
                  Clients
                </Nav.Link> */}
                <Button  onClick={() =>
                  kanbaLink(userId)
                }> Clients</Button>
                </>
              )}

              <NavDropdown
                title="Actions"
                id="collapsable-nav-dropdown"
                className="fontNavBar "
              >
                <NavDropdown.Item href="#action/3.3" className="fontNavBar ">
                  Settings
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={logoutUser} className="fontNavBar ">
                  Log out
                </NavDropdown.Item>
              </NavDropdown>

              <div className="chat-icon">
                <span>{sizeBel}</span>
                <Nav.Link>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-bell-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z" />
                  </svg>
                </Nav.Link>
              </div>

              <div className="bell-icon">
                <span>{sizeBel}</span>

                <Nav.Link>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-chat-dots-fill bellStyle"
                    viewBox="0 0 16 16"
                  >
                    <path d="M16 8c0 3.866-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.584.296-1.925.864-4.181 1.234-.2.032-.352-.176-.273-.362.354-.836.674-1.95.77-2.966C.744 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7zM5 8a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm4 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                  </svg>
                </Nav.Link>
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default withAuth(Index);
