export function StudentCard(props) {
  const student = props.student;
  const wrapper = document.createElement('div');
  
  const html = `
    <div class="card">
      <div class="profile-pic">
        <img src="${student.photo}" alt="${student.name}" loading="lazy">
      </div>
      <div class="bottom">
        <div class="content">
          <span class="name">${student.name}</span>
          <span class="about-me">${student.bio}</span>
        </div>
        <div class="bottom-bottom">
          <div class="social-links-container">
            <a href="${student.linkedin}" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
            <a href="${student.github}" target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  `;

  wrapper.innerHTML = html;
  return wrapper.innerHTML;
}

// Add styles to the document head
const style = document.createElement('style');
style.textContent = `
  .card {
    width: 280px;
    height: 280px;
    background: #111827;
    border-radius: 32px;
    padding: 3px;
    position: relative;
    box-shadow: 0 0 15px rgba(170, 0, 0, 0.2);
    transition: all 0.5s ease-in-out;
    border: 2px solid #AA0000;
  }

  .card .mail {
    position: absolute;
    right: 2rem;
    top: 1.4rem;
    background: transparent;
    border: none;
    cursor: pointer;
  }

  .card .mail svg {
    stroke: #AA0000;
    stroke-width: 3px;
    transition: all 0.3s ease;
  }

  .card .mail svg:hover {
    stroke: white;
  }

  .card .profile-pic {
    position: absolute;
    width: calc(100% - 6px);
    height: calc(100% - 6px);
    top: 3px;
    left: 3px;
    border-radius: 29px;
    z-index: 2;
    border: 0px solid #AA0000;
    overflow: hidden;
    transition: all 0.5s ease-in-out 0.2s, z-index 0.5s ease-in-out 0.2s;
  }

  .card .profile-pic img {
    object-fit: cover;
    width: 100%;
    height: 100%;
    object-position: center;
    transition: all 0.5s ease-in-out 0s;
  }

  .card .bottom {
    position: absolute;
    bottom: 3px;
    left: 3px;
    right: 3px;
    background: #AA0000;
    top: 80%;
    border-radius: 29px;
    z-index: 1;
    box-shadow: rgba(96, 75, 74, 0.1882352941) 0px 5px 5px 0px inset;
    overflow: hidden;
    transition: all 0.5s cubic-bezier(0.645, 0.045, 0.355, 1) 0s;
  }

  .card .bottom .content {
    position: absolute;
    bottom: 0;
    left: 1.5rem;
    right: 1.5rem;
    height: 160px;
  }

  .card .bottom .content .name {
    display: block;
    font-size: 1.2rem;
    color: white;
    font-weight: bold;
  }

  .card .bottom .content .about-me {
    display: block;
    font-size: 0.9rem;
    color: white;
    margin-top: 1rem;
  }

.card .bottom .bottom-bottom {
  position: absolute;
  bottom: 1rem;
  left: 1.5rem;
  right: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: flex-end; /* Changed from space-between to flex-end */
}

  .card .bottom .bottom-bottom .social-links-container {
    display: flex;
    gap: 1rem;
  }

  .card .bottom .bottom-bottom .social-links-container svg {
    height: 20px;
    fill: white;
    filter: drop-shadow(0 5px 5px rgba(255, 252, 252, 0.13));
    transition: all 0.3s ease;
  }

  .card .bottom .bottom-bottom .social-links-container svg:hover {
    fill: white;
    transform: scale(1.2);
  }

  .card .bottom .bottom-bottom .button {
    background: rgb(255, 255, 255);
    color: #AA0000;
    border: none;
    border-radius: 20px;
    font-size: 0.6rem;
    padding: 0.4rem 0.6rem;
    box-shadow: rgba(165, 132, 130, 0.1333333333) 0px 5px 5px 0px;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .card .bottom .bottom-bottom .button:hover {
    background: #f8f8f8;
    transform: scale(1.05);
  }

  .card:hover {
    border-top-left-radius: 55px;
    box-shadow: 0 0 30px rgba(170, 0, 0, 0.3);
    border: 2px solid #AA0000;
  }

  .card:hover .bottom {
    top: 20%;
    border-radius: 80px 29px 29px 29px;
    transition: all 0.5s cubic-bezier(0.645, 0.045, 0.355, 1) 0.2s;
  }

  .card:hover .profile-pic {
    width: 100px;
    height: 100px;
    aspect-ratio: 1;
    top: 10px;
    left: 10px;
    border-radius: 50%;
    z-index: 3;
    border: 4px solid #AA0000;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.8);
    transition: all 0.5s ease-in-out, z-index 0.5s ease-in-out 0.1s;
  }

  .card:hover .profile-pic:hover {
    transform: scale(1.3);
    border-radius: 0px;
  }

  .card:hover .profile-pic img {
    transform: scale(1.5);
    transition: all 0.5s ease-in-out 0.5s;
  }
`;

document.head.appendChild(style);