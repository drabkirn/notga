import React from 'react';
import { Link } from 'react-router-dom';

import Navbar from '../Shared/Navbar';
import Footer from '../Shared/Footer';

function Home() {
  return(
    <React.Fragment>
      <Navbar />

      <header className="container center-align">
        <div>
          <img src="/icons/dbk/drabkirn-logo-192x192.png" alt="drabkirn logo" className="responsive-img" />
        </div>
        <div>
          <h1>Notga</h1>
        </div>
        <div>
          <p className="fs-1-2 bold">TLDR; Take free, private, secure, unlimited, end-to-end encrypted, and decentralized notes in markdown/WYSIWYG editor. What else do you need? <span role="img" aria-label="Thinking emoji">🤔️</span></p>
        </div>
        <div className="center-align mt-3rem">
          <Link className="btn btn-large oxford-blue-btn" to="/login" style={{ width: "240px" }}>
            Get started now
            <i className="material-icons right">send</i>
          </Link>
          <br /><br />
          <a href="#tour" className="btn btn-large oxford-blue-btn" style={{ width: "240px" }}>
            Take a tour
            <i className="material-icons right">airplanemode_active</i>
          </a>
        </div>

        <hr />
      </header>

      <section className="container mt-5rem" id="tour">
        <div className="row flex-center-vh">
          <div className="col m6 s12">
            <img src="/images/illustrations/privacy.svg" alt="privacy illustration" className="responsive-img" />
          </div>

          <div className="col m6 s12">
            <h3 className="center-align">Privacy in mind</h3>
            <p className="fs-1-2">
              Notga is powered by Blockstack, an open-source, blockchain-based decentralized internet platform and app ecosystem that puts users in control of their identity and data. No company owns or controls Blockstack, it is independent.
              <br />
              <a href="#how-it-works">See how it works</a>.
            </p>
          </div>
        </div>

        <hr />
      </section>

      <section className="container mt-5rem" id="how-it-works">
        <div className="row flex-center-vh hide-on-small-only">
          <div className="col m6 s12">
            <h3 className="center-align">How it works</h3>
            <p className="fs-1-2">
              When you create a Blockstack account, you'll get a secret key that will encrypt everything that you do in the Blockstack app. Because of this, Blockstack or Notga or anyone can't see or track your data. Your data can only be unlocked with the secret key that you own.
            </p>
            <p className="fs-1-2">
              So when you create a notebook in Notga, it is encrypted by your secret key on your device itself and then saved on the <a href="#storage">cloud</a>. Without your secret key, no one can have access to your notebooks.
            </p>
            <p className="fs-1-2">
              Your only task is to keep your secret key confidential and do not share it with others(like a password). If you lose your secret key, you lose your data also.
            </p>
          </div>

          <div className="col m6 s12">
            <img src="/images/illustrations/factory.svg" alt="how it works illustration" className="responsive-img" />
          </div>
        </div>

        <div className="row flex-center-vh show-on-small hide-on-med-and-up">
          <div className="col m6 s12">
            <img src="/images/illustrations/factory.svg" alt="how it works illustration" className="responsive-img" />
          </div>

          <div className="col m6 s12">
            <h3 className="center-align">How it works</h3>
            <p className="fs-1-2">
              When you create a Blockstack account, you'll get a secret key that will encrypt everything that you do in the Blockstack app. Because of this, Blockstack or Notga or anyone can't see or track your data. Your data can only be unlocked with the secret key that you own.
            </p>
            <p className="fs-1-2">
              So when you create a notebook in Notga, it is encrypted by your secret key on your device itself and then saved on the <a href="#storage">cloud</a>. Without your secret key, no one can have access to your notebooks.
            </p>
            <p className="fs-1-2">
              Your only task is to keep your secret key confidential and do not share it with others(like a password). If you lose your secret key, you lose your data also.
            </p>
          </div>
        </div>

        <hr />
      </section>

      <section className="container mt-5rem" id="storage">
        <div className="row flex-center-vh">
          <div className="col m6 s12">
            <img src="/images/illustrations/storage.svg" alt="storage illustration" className="responsive-img" />
          </div>

          <div className="col m6 s12">
            <h3 className="center-align">Storage</h3>
            <p className="fs-1-2">
              By default, all data is stored on free space provided by Blockstack. But you can even choose to store data on your own server using <a href="https://github.com/blockstack/gaia" target="_blank" rel="noopener noreferrer">Gaia</a>. Since it's end-to-end encrypted, it doesn't matter where it's stored.
            </p>
          </div>
        </div>

        <hr />
      </section>

      <section className="container mt-5rem">
        <div className="row flex-center-vh hide-on-small-only">
          <div className="col m6 s12">
            <h3 className="center-align">Taking Notes</h3>
            <p className="fs-1-2">
              Like we've mentioned, you can create unlimited notes using Notga. You can write your notes in markdown or WYSIWYG(What You See Is What You Get) editor. Other features include code-snippets with syntax highlighting and keyboard shortcuts to navigate around the web app faster and more comfortable.
            </p>
          </div>

          <div className="col m6 s12">
            <img src="/images/illustrations/notebook.svg" alt="notebook illustration" className="responsive-img" />
          </div>
        </div>

        <div className="row flex-center-vh show-on-small hide-on-med-and-up">
          <div className="col m6 s12">
            <img src="/images/illustrations/notebook.svg" alt="notebook illustration" className="responsive-img" />
          </div>

          <div className="col m6 s12">
            <h3 className="center-align">Taking Notes</h3>
            <p className="fs-1-2">
              Like we've mentioned, you can create unlimited notes using Notga. You can write your notes in markdown or WYSIWYG(What You See Is What You Get) editor. Other features include code-snippets with syntax highlighting and keyboard shortcuts to navigate around the web app faster and more comfortable.
            </p>
          </div>
        </div>

        <hr />
      </section>

      <section className="container mt-5rem">
        <div className="row flex-center-vh">
          <div className="col m6 s12">
            <img src="/images/illustrations/lockin.svg" alt="lockin illustration" className="responsive-img" />
          </div>

          <div className="col m6 s12">
            <h3 className="center-align">No Lock-in's</h3>
            <p className="fs-1-2">
              One question to ask, what if Notga stops working from tomorrow? Will I lose access to all my notes?
            </p>
            <p className="fs-1-2">
              Simple answer, NO. Notga doesn't store any of your data, you choose where to store your data(defaults to your Blockstack). You can access your notes with alternative interfaces even if Notga stops working from tomorrow.
            </p>
          </div>
        </div>

        <hr />
      </section>

      <section className="container mt-5rem">
        <div className="row flex-center-vh hide-on-small-only">
          <div className="col m6 s12">
            <h3 className="center-align">Set it free</h3>
            <p className="fs-1-2">
              We loved building Notga, so we set it free and even made it open-source whose codebase is available on <a href="https://go.cdadityang.xyz/NghG" target="_blank" rel="noopener noreferrer">GitHub</a>. So, no hidden data hogs, and we feel like a free bird. <span role="img" aria-label="hug emoji">🤗️</span> <span role="img" aria-label="halo emoji">😇️</span>
            </p>
          </div>

          <div className="col m6 s12">
            <img src="/images/illustrations/set-it-free.svg" alt="set-it-free illustration" className="responsive-img" />
          </div>
        </div>

        <div className="row flex-center-vh show-on-small hide-on-med-and-up">
          <div className="col m6 s12">
            <img src="/images/illustrations/set-it-free.svg" alt="set-it-free illustration" className="responsive-img" />
          </div>

          <div className="col m6 s12">
            <h3 className="center-align">Set it free</h3>
            <p className="fs-1-2">
              We loved building Notga, so we set it free and even made it open-source whose codebase is available on <a href="https://go.cdadityang.xyz/NghG" target="_blank" rel="noopener noreferrer">GitHub</a>. So, no hidden data hogs, and we feel like a free bird. <span role="img" aria-label="hug emoji">🤗️</span> <span role="img" aria-label="halo emoji">😇️</span>
            </p>
          </div>
        </div>
      </section>

      <section className="container mt-5rem">
        <div className="center-align">
          <Link className="btn btn-large oxford-blue-btn" to="/login">
            Get started now
            <i className="material-icons right">send</i>
          </Link>
        </div>
      </section>

      <Footer />
    </React.Fragment>
  );
};

export default Home;