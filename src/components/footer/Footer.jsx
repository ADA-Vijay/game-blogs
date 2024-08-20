import Form from "react-bootstrap/Form";
import styles from "@/components/footer/footer.module.css";
import pageStyle from "../../app/page.module.css";
import Link from "next/link";
function Footer() {
  return (
    // <div className={styles.footerWrap}>
    //   <div className={pageStyle.container}>
    //     <div className={styles.footerBody}>
    //       <div className={styles.footerLogo}>
    //         <div className={styles.footerLogoImg}>
    //           <img src="https://fama.b-cdn.net/gw/gwlogo.png" alt="logo" />
    //         </div>
    //         {/* <div className={styles.footerContent}>
    //           <p>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </p>
    //           <div className={styles.footerSearchInput}>
    //             <Form.Control type="text" placeholder="Search" />
    //             <span className={styles.footerSearchIcon}>
    //               <svg
    //                 xmlns="http://www.w3.org/2000/svg"
    //                 width="16"
    //                 height="16"
    //                 fill="currentColor"
    //                 className="bi bi-search"
    //                 viewBox="0 0 16 16"
    //               >
    //                 <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
    //               </svg>
    //             </span>
    //           </div>
    //         </div> */}
    //         <div className={styles["footer-ul1"]}>
    //           <ul>
    //             <li>Join Our Team</li>
    //             <li className={styles["li-line"]}>Our Audience</li>
    //             <li>About Us</li>
    //             <li className={styles["li-line"]}>Press & Events</li>
    //             <li>Contact Us</li>
    //           </ul>
    //         </div>
    //       </div>

    //       <div className={styles.footerContentItem}>
    //         <div></div>
    //         {/* <div className={styles.footerInstagram}>
    //             <div className={styles.footerLinkTitle}>Instagram</div>
    //             <div className={styles.footerMediaImg}>
    //               <ul>
    //                 <li>
    //                   <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPzZht6I6bn2jLswujx_eqy3Yq6L4fkxvNIZipf3ggrz51yUIi' alt="img"  />
    //                 </li>
    //                 <li>
    //                   <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPzZht6I6bn2jLswujx_eqy3Yq6L4fkxvNIZipf3ggrz51yUIi' alt="img" />
    //                 </li>
    //                 <li>
    //                   <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPzZht6I6bn2jLswujx_eqy3Yq6L4fkxvNIZipf3ggrz51yUIi' alt="img" />
    //                 </li>
    //                 <li>
    //                   <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPzZht6I6bn2jLswujx_eqy3Yq6L4fkxvNIZipf3ggrz51yUIi' alt="img"/>
    //                 </li>
    //                 <li>
    //                   <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPzZht6I6bn2jLswujx_eqy3Yq6L4fkxvNIZipf3ggrz51yUIi' alt="img" />
    //                 </li>
    //                 <li>
    //                   <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPzZht6I6bn2jLswujx_eqy3Yq6L4fkxvNIZipf3ggrz51yUIi' alt="img" />
    //                 </li>
    //               </ul>
    //             </div>
    //           </div> */}
    //         <div></div>
    //         <div className={styles.footerNewsletter}>
    //           <div className={styles.footerLinkTitle}>Newsletter</div>
    //           <div className={styles.footerContent}>
    //             {/* <p>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </p> */}
    //             {/* <div className={styles.footerSearchInput}>
    //               <Form.Control type="text" placeholder="Subscribe" />
    //               <span className={styles.footerSearchIcon}>
    //                 <svg
    //                   xmlns="http://www.w3.org/2000/svg"
    //                   width="16"
    //                   height="16"
    //                   fill="currentColor"
    //                   className="bi bi-envelope"
    //                   viewBox="0 0 16 16"
    //                 >
    //                   <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z" />
    //                 </svg>
    //               </span>
    //             </div> */}
    //             <div className={styles["footer-ul1"]}>
    //               <ul>
    //                 <li>Advertising</li>
    //                 <li className={styles["li-line"]}>Careers</li>
    //                 <li>Terms</li>
    //                 <li className={styles["li-line"]}>Privacy</li>
    //                 <li>Policies</li>
    //               </ul>
    //             </div>
    //           </div>
    //         </div>

    //         <div></div>
    //         <div></div>
    //         <div className={`${styles.footerNewsletter} ${styles.contactUs}`}>
    //           {/* <div className={`${styles.footerLinkTitle}`}>Contact Us</div> */}
    //           {/* <Link href="mailto:officialgamewitted@gmail.com">
    //             officialgamewitted@gmail.com
    //           </Link> */}
    //           <p className={styles.smallDesc}>Game Rant is part of the Valnet Publishing Group</p>
    //         </div>
    //       </div>
    //       <div className={`${styles.footerNewsletter} ${styles.contactUs}`}>
    //         {/* <Link href="/privacy-policy"> <div className={`${styles.footerLinkTitle}`}>Privacy and Policy</div></Link> */}
    //         <ul className={styles["footer-ul2"]}>
    //           <li className={styles["bold-li"]}>Follow Us</li>
    //           <li className={styles.liIcon}>
    //             <i className="fa-brands fa-youtube"></i>
    //           </li>
    //           <li className={styles.liIcon}>
    //             <i className="fa-brands fa-facebook-f"></i>
    //           </li>
    //           <li className={styles.liIcon}>
    //             <i className="fa-brands fa-instagram"></i>
    //           </li>
    //           <li className={styles.liIcon}>
    //             <i class="fa-brands fa-x-twitter"></i>
    //           </li>
    //           <li className={styles.liIcon}>
    //             <i className="fa-brands fa-tiktok"></i>
    //           </li>
    //           <li className={styles.liIcon}>
    //             <i className="fa-brands fa-linkedin"></i>
    //           </li>
    //         </ul>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <>
      <div className={styles.footerWrap}>
        <div className={`${styles["container"]} container`}>
          <div className={styles.footerItem1}>
            <ul className={styles["item-ul-wrap"]}>
              <li>
                <div className={styles.footerLogoImg}>
                  <img src="https://fama.b-cdn.net/gw/gwlogo.png" alt="logo" />
                </div>
              </li>
              <li>
                <div className={styles["footer-ul1"]}>
                  <ul>
                    <li>
                      <Link href="/join-our-team" className={styles.link}>
                        {" "}
                        Join Our Team
                      </Link>
                    </li>

                    <li className={styles["li-line"]}>
                      <Link href="/about-us" className={styles.link}>
                        About Us{" "}
                      </Link>
                    </li>

                    <li>
                      {" "}
                      <Link
                        href="mailto:Officialgamewitted@gmail.com"
                        className={styles.link}
                      >
                        Contact Us
                      </Link>
                    </li>

                    <li className={styles["li-line"]}>
                      <Link href="/partnership" className={styles.link}>
                        Partnership{" "}
                      </Link>
                    </li>

                    <li>
                      <Link href="/privacy-policy" className={styles.link}>
                        Privacy
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>
              <li className={styles["item-ul-li-last"]}>
                <ul className={styles["footer-ul2"]}>
                  <li className={styles["bold-li"]}>Follow Us</li>
                  <li className={styles.liIcon}>
                    <i className="fa-brands fa-youtube"></i>
                  </li>

                  <li className={styles.liIcon}>
                    <i className="fa-brands fa-x-twitter"></i>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
