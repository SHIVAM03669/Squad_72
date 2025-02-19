export function MentorCard(props) {
  const mentor = props.mentor;
  const wrapper = document.createElement('div');
  
  const html = `
    <div class="card-wrapper">
      <style>
        .card-wrapper .card {
          width: 190px;
          height: 254px;
          background: #1f2937;
          border-radius: 10px;
          text-align: center;
          transition: all 0.5s;
          position: relative;
          overflow: hidden; /* Added overflow: hidden */
          border: 1px solid #EB455F;
        }

        .card-wrapper .card:hover {
          box-shadow: 0 0 20px 1px rgba(235, 69, 95, 0.2);
          background-color: #EB455F;
          border-color: #EB455F;
        }

        .card-wrapper .card .blob {
          height: 10px;
          width: 75%;
          border-radius: 0 0 30px 30px;
          margin: 0 auto;
          background-color: #EB455F;
          visibility: visible;
          transition: all 0.3s;
        }

        .card-wrapper .card:hover .blob {
          height: 0;
        }

        .card-wrapper .card .img {
          display: flex;
          margin: 30px auto 10px auto;
          width: 70px;
          height: 70px;
          background-color: #374151;
          border-radius: 50%;
          font-size: 11px;
          justify-content: center;
          align-items: center;
          transition: all 0.5s;
          overflow: hidden;
        }

        .card-wrapper .card .img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s;
        }

        .card-wrapper .card:hover .img {
          width: 100%;
          height: 70%;
          border-radius: 10px 10px 0 0;
          margin: 0 auto;
          z-index: 1;
          overflow: hidden;
        }

        .card-wrapper .card:hover .img img {
          transform: scale(1.2);
        }

        .card-wrapper .card h2 {
          padding: 15px 10px;
          font-size: 1.25rem;
          font-weight: 600;
          transition: all 0.1s;
          z-index: 2;
          line-height: 1.2;
          color: #fff;
          font-family: 'Inter', sans-serif;
        }

        .card-wrapper .card span {
          font-size: 0.875rem;
          color: #d1d5db;
          display: block;
          margin-top: 0.5rem;
          font-family: 'Inter', sans-serif;
        }

        .card-wrapper .card:hover h2 {
          opacity: 0;
          transform: translateY(-20px);
        }

        .card-wrapper .card > p {
          opacity: 0;
          transition: all 0.75s;
          position: absolute;
          bottom: 15px;
          left: 0;
          right: 0;
          padding: 0 1rem;
          z-index: 3;
        }

        .card-wrapper .card:hover > p {
          opacity: 1;
        }

        .card-wrapper .card > p > a {
          display: inline-block;
          padding: 5px;
          margin: 0 5px;
        }

        .card-wrapper .card > p > a > svg {
          width: 24px;
          height: 24px;
          transition: transform 0.3s ease;
        }

        .card-wrapper .card > p > a > svg:hover {
          transform: scale(1.1);
        }
      </style>
      <div class="card">
        <div class="blob"></div>
        <div class="img">
          <img src="${mentor.photo}" alt="${mentor.name}" loading="lazy" />
        </div>
        <h2>${mentor.name}<br/><span>${mentor.bio}</span></h2>
        <p>
          <a href="${mentor.linkedin}" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile">
            <svg style="margin-left: 20px;" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path fill="#ffffff" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
          </a>
          <a href="${mentor.github}" target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile">
          </a>
        </p>
      </div>
    </div>
  `;

  wrapper.innerHTML = html;
  return wrapper.innerHTML;
}
