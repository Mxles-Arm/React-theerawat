import React, { useEffect, useMemo, useRef, useState } from "react";

export default function ItunesPage() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [error, setError] = useState("");

  // ✅ NEW: mode toggle (video | audio)
  const [mode, setMode] = useState("video");

  // เก็บ refs ของ media (ทั้ง audio และ video) เพื่อ pause ตัวอื่น
  const mediaRefs = useRef(new Map());
  const abortRef = useRef(null);

  const canSearch = useMemo(() => searchTerm.trim().length > 0, [searchTerm]);

  const pauseAllExcept = (exceptKey) => {
    for (const [key, media] of mediaRefs.current.entries()) {
      if (!media) continue;
      if (key !== exceptKey && !media.paused) media.pause();
    }
  };

  const closeModal = () => {
    // ปิด modal แล้วหยุดเสียง/วิดีโอใน modal ด้วย (กันเสียงค้าง)
    const modalEl = document.getElementById("modalMedia");
    if (modalEl && !modalEl.paused) modalEl.pause();
    setSelectedItem(null);
  };

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ✅ NEW: clear results when switching mode (optional but cleaner)
  useEffect(() => {
    setItems([]);
    setSelectedItem(null);
    setError("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  const searchMV = async (e) => {
    if (e) e.preventDefault();
    setError("");

    const term = searchTerm.trim();
    if (!term) return;

    if (abortRef.current) abortRef.current.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setIsLoading(true);
    try {
      // ✅ UPDATED: entity depends on mode
      const entity = mode === "video" ? "musicVideo" : "song";

      const url = `https://itunes.apple.com/search?term=${encodeURIComponent(
        term
      )}&entity=${entity}&limit=24`;

      const res = await fetch(url, { signal: controller.signal });
      if (!res.ok) throw new Error("Fetch failed");

      const data = await res.json();

      const secureData = (data.results || [])
        .map((item) => ({
          ...item,
          previewUrl: item.previewUrl
            ? item.previewUrl.replace("http://", "https://")
            : "",
          artworkUrl100: item.artworkUrl100
            ? item.artworkUrl100.replace("http://", "https://")
            : "",
        }))
        // keep sort logic (only meaningful when mixed, but safe)
        .sort((a, b) => {
          const aIsVideo = a.kind === "music-video";
          const bIsVideo = b.kind === "music-video";
          return Number(bIsVideo) - Number(aIsVideo);
        });

      setItems(secureData);
    } catch (err) {
      if (err?.name !== "AbortError") {
        console.error(err);
        setError("An error occurred while fetching data. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const isVideoItem = (item) => item?.kind === "music-video";
  const isAudioItem = (item) => item?.kind === "song";

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <header style={styles.header}>
          <div>
            <div style={styles.brand}>miniTunes</div>
            <div style={styles.sub}>Search music videos + songs via iTunes API</div>
          </div>

          <form onSubmit={searchMV} style={styles.form}>
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search songs / artists like : red hot chili peppers, AC/DC"
              style={styles.input}
            />
            <button type="submit" disabled={!canSearch || isLoading} style={styles.button}>
              {isLoading ? "Searching..." : "Search"}
            </button>
          </form>
        </header>

        {/* ✅ NEW: mode buttons */}
        <div style={styles.modeRow}>
          <button
            type="button"
            onClick={() => setMode("video")}
            style={{
              ...styles.modeBtn,
              ...(mode === "video" ? styles.modeBtnActive : null),
            }}
          >
            Video
          </button>
          <button
            type="button"
            onClick={() => setMode("audio")}
            style={{
              ...styles.modeBtn,
              ...(mode === "audio" ? styles.modeBtnActive : null),
            }}
          >
            Audio
          </button>
        </div>

        {error ? <div style={styles.error}>{error}</div> : null}

        {!isLoading && items.length === 0 ? (
          <div style={styles.empty}>
            Enter a keyword and click "Search" (like: <b>Oasis</b>)
          </div>
        ) : null}

        <div style={styles.grid}>
          {items.map((item) => {
            const key = item.trackId || `${item.wrapperType}-${item.collectionId}-${item.trackName}`;
            const typeLabel = isVideoItem(item) ? "VIDEO" : isAudioItem(item) ? "AUDIO" : "PREVIEW";

            // ✅ NEW: enforce display by mode (for safety)
            const shouldShowVideo = mode === "video";
            const shouldShowAudio = mode === "audio";

            return (
              <div key={key} style={styles.card}>
                <div style={styles.cardTop}>
                  <img
                    src={item.artworkUrl100}
                    alt={item.trackName}
                    style={styles.cover}
                    loading="lazy"
                  />

                  <div style={styles.badge}>{typeLabel}</div>

                  <button
                    style={styles.openBtn}
                    onClick={() => {
                      pauseAllExcept(null);
                      setSelectedItem(item);
                    }}
                  >
                    View details
                  </button>
                </div>

                <div style={styles.meta}>
                  <div style={styles.title} title={item.trackName}>
                    {item.trackName || "-"}
                  </div>
                  <div style={styles.artist} title={item.artistName}>
                    {item.artistName || "-"}
                  </div>

                  {item.previewUrl ? (
                    shouldShowVideo ? (
                      <video
                        controls
                        preload="none"
                        style={styles.video}
                        ref={(el) => {
                          if (el) mediaRefs.current.set(key, el);
                          else mediaRefs.current.delete(key);
                        }}
                        onPlay={() => pauseAllExcept(key)}
                      >
                        <source src={item.previewUrl} type="video/mp4" />
                      </video>
                    ) : shouldShowAudio ? (
                      <audio
                        controls
                        preload="none"
                        style={styles.audio}
                        ref={(el) => {
                          if (el) mediaRefs.current.set(key, el);
                          else mediaRefs.current.delete(key);
                        }}
                        onPlay={() => pauseAllExcept(key)}
                      >
                        <source src={item.previewUrl} type="audio/mpeg" />
                        <source src={item.previewUrl} type="audio/mp4" />
                      </audio>
                    ) : (
                      <div style={styles.noPreview}>No preview link available</div>
                    )
                  ) : (
                    <div style={styles.noPreview}>No preview link available</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {selectedItem ? (
        <div
          style={styles.modalOverlay}
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <div style={styles.modal}>
            <div style={styles.modalHeader}>
              <div>
                <div style={styles.modalTitle}>{selectedItem.trackName}</div>
                <div style={styles.modalSub}>{selectedItem.artistName}</div>
              </div>
              <button style={styles.closeBtn} onClick={closeModal}>
                ✕
              </button>
            </div>

            {selectedItem.previewUrl ? (
              mode === "video" ? (
                <video
                  id="modalMedia"
                  controls
                  autoPlay
                  style={styles.modalVideo}
                  onPlay={() => pauseAllExcept("MODAL")}
                >
                  <source src={selectedItem.previewUrl} type="video/mp4" />
                </video>
              ) : (
                <div style={styles.modalAudioWrap}>
                  <audio
                    id="modalMedia"
                    controls
                    autoPlay
                    style={styles.modalAudio}
                    onPlay={() => pauseAllExcept("MODAL")}
                  >
                    <source src={selectedItem.previewUrl} type="audio/mpeg" />
                    <source src={selectedItem.previewUrl} type="audio/mp4" />
                  </audio>
                </div>
              )
            ) : (
              <div style={styles.noPreview}>No preview link available</div>
            )}

            <div style={styles.modalInfo}>
              <div>
                <b>Mode:</b> {mode === "video" ? "Video" : "Audio"}
              </div>
              <div>
                <b>Type:</b>{" "}
                {isVideoItem(selectedItem)
                  ? "Music Video"
                  : isAudioItem(selectedItem)
                  ? "Song (Audio)"
                  : "-"}
              </div>
              <div><b>Album:</b> {selectedItem.collectionName || "-"}</div>
              <div><b>Genre:</b> {selectedItem.primaryGenreName || "-"}</div>
              <div><b>Country:</b> {selectedItem.country || "-"}</div>
              <div style={styles.linkRow}>
                {selectedItem.trackViewUrl ? (
                  <a
                    href={selectedItem.trackViewUrl}
                    target="_blank"
                    rel="noreferrer"
                    style={styles.link}
                  >
                    View on iTunes
                  </a>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#180b47",
    color: "#e8eefc",
    fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial",
  },
  container: {
    maxWidth: 1100,
    margin: "0 auto",
    padding: "24px 16px 48px",
  },
  header: {
    display: "flex",
    gap: 16,
    alignItems: "flex-end",
    justifyContent: "space-between",
    flexWrap: "wrap",
    marginBottom: 18,
  },
  brand: { fontSize: 24, fontWeight: 800, letterSpacing: 0.2 },
  sub: { opacity: 0.75, fontSize: 13, marginTop: 4 },
  form: { display: "flex", gap: 10, alignItems: "center" },
  input: {
    width: 360,
    maxWidth: "70vw",
    padding: "12px 12px",
    borderRadius: 14,
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(255,255,255,0.06)",
    color: "#e8eefc",
    outline: "none",
  },
  button: {
    padding: "12px 14px",
    borderRadius: 14,
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(255,255,255,0.10)",
    color: "#e8eefc",
    cursor: "pointer",
  },

  // ✅ NEW: mode buttons styles
  modeRow: {
    display: "flex",
    gap: 10,
    marginBottom: 14,
  },
  modeBtn: {
    height: 36,
    padding: "0 14px",
    borderRadius: 999,
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(255,255,255,0.06)",
    color: "#e8eefc",
    cursor: "pointer",
    fontWeight: 700,
  },
  modeBtnActive: {
    background: "rgba(255,255,255,0.16)",
    border: "1px solid rgba(255,255,255,0.22)",
  },

  error: {
    padding: 12,
    borderRadius: 14,
    border: "1px solid rgba(255,80,80,0.35)",
    background: "rgba(255,80,80,0.08)",
    marginBottom: 14,
  },
  empty: {
    padding: 18,
    borderRadius: 18,
    border: "1px dashed rgba(255,255,255,0.16)",
    background: "rgba(255,255,255,0.04)",
    marginTop: 10,
  },
  grid: {
    marginTop: 16,
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
    gap: 14,
  },
  card: {
    borderRadius: 18,
    border: "1px solid rgba(255,255,255,0.10)",
    background: "rgba(255,255,255,0.04)",
    overflow: "hidden",
  },
  cardTop: { position: "relative", padding: 14, display: "flex", gap: 12, alignItems: "center" },
  cover: { width: 72, height: 72, borderRadius: 16, objectFit: "cover" },
  badge: {
    position: "absolute",
    top: 10,
    left: 10,
    padding: "4px 8px",
    borderRadius: 999,
    fontSize: 11,
    fontWeight: 800,
    letterSpacing: 0.5,
    border: "1px solid rgba(255,255,255,0.16)",
    background: "rgba(0,0,0,0.25)",
  },
  openBtn: {
    marginLeft: "auto",
    height: 36,
    padding: "0 12px",
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(255,255,255,0.08)",
    color: "#e8eefc",
    cursor: "pointer",
    whiteSpace: "nowrap",
  },
  meta: { padding: "0 14px 14px" },
  title: {
    fontWeight: 800,
    fontSize: 14,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  artist: {
    opacity: 0.78,
    fontSize: 12,
    marginTop: 2,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  video: {
    width: "100%",
    marginTop: 10,
    borderRadius: 14,
    border: "1px solid rgba(255,255,255,0.10)",
    background: "#000",
  },
  audio: {
    width: "100%",
    marginTop: 10,
    borderRadius: 14,
    border: "1px solid rgba(255,255,255,0.10)",
    background: "rgba(0,0,0,0.25)",
  },
  noPreview: {
    marginTop: 10,
    padding: 10,
    borderRadius: 14,
    border: "1px solid rgba(255,255,255,0.10)",
    opacity: 0.8,
    fontSize: 12,
  },
  modalOverlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.60)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  modal: {
    width: "min(920px, 96vw)",
    borderRadius: 22,
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(15,20,35,0.98)",
    overflow: "hidden",
  },
  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    gap: 12,
    padding: 16,
    borderBottom: "1px solid rgba(255,255,255,0.10)",
  },
  modalTitle: { fontSize: 16, fontWeight: 900 },
  modalSub: { fontSize: 13, opacity: 0.8, marginTop: 2 },
  closeBtn: {
    width: 40,
    height: 40,
    borderRadius: 14,
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(255,255,255,0.08)",
    color: "#e8eefc",
    cursor: "pointer",
  },
  modalVideo: {
    width: "100%",
    background: "#000000",
    maxHeight: "60vh",
  },
  modalAudioWrap: { padding: 16 },
  modalAudio: {
    width: "100%",
    borderRadius: 14,
    border: "1px solid rgba(255,255,255,0.10)",
    background: "rgba(0,0,0,0.25)",
  },
  modalInfo: { padding: 16, display: "grid", gap: 8, fontSize: 13, opacity: 0.92 },
  linkRow: { marginTop: 6 },
  link: { color: "#cfe1ff", textDecoration: "underline" },
};