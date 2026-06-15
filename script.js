
AOS.init(
  {
      duration: 1200,
  }
);

const capaJhone = document.getElementById("depoimentoJhone");
const modalJhone = document.getElementById("modalJhone");
const videoContainer = document.getElementById("video-containerJhone");
const closeBtn = document.querySelector(".close-depoimento");

if (capaJhone && modalJhone && videoContainer) {
  capaJhone.addEventListener("click", () => {
    modalJhone.style.display = "flex";
    videoContainer.innerHTML = `
      <iframe src="https://www.youtube.com/embed/ShcucfOriyI?autoplay=1&si=zB2kYOP0X8xTSmZY"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen>
      </iframe>
    `;
  });

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      modalJhone.style.display = "none";
      videoContainer.innerHTML = "";
    });
  }

  window.addEventListener("click", (e) => {
    if (e.target === modalJhone) {
      modalJhone.style.display = "none";
      videoContainer.innerHTML = "";
    }
  });
}

const modalGeral = document.getElementById("modalDepoimentos");
const videoContainerGeral = document.getElementById("video-container-geral");
const closeBtnGeral = document.querySelector(".close-depoimento-geral");

if (modalGeral && videoContainerGeral) {
  document.querySelectorAll(".depoimento").forEach((depoimento) => {
    depoimento.addEventListener("click", () => {
      const videoUrl = depoimento.getAttribute("data-video");
      if (!videoUrl) return;

      modalGeral.style.display = "flex";
      videoContainerGeral.innerHTML = `
        <iframe src="${videoUrl}&autoplay=1"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen>
        </iframe>
      `;
    });
  });

  if (closeBtnGeral) {
    closeBtnGeral.addEventListener("click", () => {
      modalGeral.style.display = "none";
      videoContainerGeral.innerHTML = "";
    });
  }

  window.addEventListener("click", (e) => {
    if (e.target === modalGeral) {
      modalGeral.style.display = "none";
      videoContainerGeral.innerHTML = "";
    }
  });
}

(function () {
  var vsl = document.querySelector('#home .vsl');
  if (!vsl) return;

  var ytPlayer = null;

  function loadYouTubeAPI() {
    return new Promise(function (resolve) {
      if (window.YT && window.YT.Player) return resolve();
      if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
        var tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        document.head.appendChild(tag);
      }
      var prev = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = function () {
        if (typeof prev === 'function') prev();
        resolve();
      };
    });
  }

  function activate() {
    if (vsl.classList.contains('is-playing')) return;
    var id = vsl.getAttribute('data-video-id');
    if (!id) return;

    var mount = document.createElement('div');
    mount.id = 'vsl-yt-frame';
    mount.className = 'vsl__iframe';
    vsl.appendChild(mount);

    var blocker = document.createElement('div');
    blocker.className = 'vsl__click-blocker';
    blocker.setAttribute('aria-hidden', 'true');
    vsl.appendChild(blocker);

    vsl.classList.add('is-playing');

    loadYouTubeAPI().then(function () {
      ytPlayer = new YT.Player('vsl-yt-frame', {
        videoId: id,
        host: 'https://www.youtube-nocookie.com',
        playerVars: {
          autoplay: 1,
          rel: 0,
          modestbranding: 1,
          playsinline: 1,
          controls: 0,
          disablekb: 1,
          fs: 0,
          iv_load_policy: 3,
          cc_load_policy: 0
        },
        events: {
          onReady: function (e) {
            try { e.target.playVideo(); } catch (_) {}
          }
        }
      });
    });

    blocker.addEventListener('click', function () {
      if (!ytPlayer || typeof ytPlayer.getPlayerState !== 'function') return;
      var state = ytPlayer.getPlayerState();
      if (state === 1) {
        ytPlayer.pauseVideo();
      } else {
        ytPlayer.playVideo();
      }
    });
  }

  vsl.addEventListener('click', activate);
  vsl.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      activate();
    }
  });
})();



