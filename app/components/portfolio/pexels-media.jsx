"use client";

import { useEffect, useState, useRef } from "react";
import { cn } from "../../utils/cn";

const PEXELS_API_KEY = process.env.NEXT_PUBLIC_PEXEL_API_KEY || "";

export function usePexelsImage(query, orientation = "landscape") {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const cacheRef = useRef({});

  useEffect(() => {
    const cacheKey = `${query}-${orientation}`;
    if (cacheRef.current[cacheKey]) {
      setImage(cacheRef.current[cacheKey]);
      setLoading(false);
      return;
    }

    let cancelled = false;

    const fetchImage = async () => {
      try {
        const res = await fetch(
          `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&orientation=${orientation}&per_page=1`,
          { headers: { Authorization: PEXELS_API_KEY } }
        );
        if (!res.ok) {
          throw new Error(`Pexels API error: ${res.status} ${res.statusText}`);
        }
        const data = await res.json();
        if (!cancelled && data.photos?.length) {
          cacheRef.current[cacheKey] = data.photos[0];
          setImage(data.photos[0]);
        }
      } catch (e) {
        console.warn(`Pexels image fetch failed for "${query}":`, e);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchImage();
    return () => { cancelled = true; };
  }, [query, orientation]);

  return { image, loading };
}

export function PexelsImage({ query, orientation = "landscape", className, overlay = false, overlayColor = "rgba(15,23,42,0.4)" }) {
  const { image, loading } = usePexelsImage(query, orientation);
  const src = image?.src?.large || image?.src?.original;

  if (!src || loading) return null;

  return (
    <div
      className={cn("bg-cover bg-center", className)}
      style={{
        backgroundImage: `url(${src})`,
        ...(overlay ? { position: "relative" } : {}),
      }}
    >
      {overlay ? (
        <div
          className="absolute inset-0"
          style={{ backgroundColor: overlayColor }}
        />
      ) : null}
    </div>
  );
}

export function PexelsSection({
  query,
  orientation = "landscape",
  className,
  children,
  gradient = "linear-gradient(180deg, rgba(252,250,245,0.92), rgba(252,250,245,0.96))",
}) {
  const { image, loading } = usePexelsImage(query, orientation);
  const src = image?.src?.large || image?.src?.original;

  return (
    <div
      className={cn("relative bg-cover bg-center bg-no-repeat", className)}
      style={{
        backgroundImage: src && !loading
          ? `${gradient}, url(${src})`
          : gradient,
      }}
    >
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export function PexelsHeroImage({ query, orientation = "landscape", className, children, height = "h-96" }) {
  const { image, loading } = usePexelsImage(query, orientation);
  const src = image?.src?.large2x || image?.src?.original;
  const [loaded, setLoaded] = useState(false);

  if (!src || loading) {
    return (
      <div className={cn("flex items-center justify-center bg-slate-100", height, className)}>
        <div className="size-8 animate-pulse rounded-full bg-slate-300" />
      </div>
    );
  }

  return (
    <div
      className={cn("relative overflow-hidden", height, className)}
    >
      {/* Hidden img to trigger onLoad, then fade in via background-image */}
      <img
        src={src}
        alt=""
        className="hidden"
        onLoad={() => setLoaded(true)}
      />
      <div
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-500"
        style={{
          backgroundImage: `url(${src})`,
          opacity: loaded ? 1 : 0,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent" />
      {children ? <div className="relative z-10 h-full">{children}</div> : null}
    </div>
  );
}

export function PexelsCardImage({ query, orientation = "portrait", className, size = "small" }) {
  const { image, loading } = usePexelsImage(query, orientation);
  const src = image?.src?.tiny || image?.src?.small;

  if (!src || loading) {
    return (
      <div className={cn(
        "shrink-0 rounded-2xl bg-slate-100",
        size === "small" ? "size-16" : "size-20",
        className
      )} />
    );
  }

  return (
    <div
      className={cn(
        "shrink-0 rounded-2xl bg-cover bg-center",
        size === "small" ? "size-16" : "size-20",
        className
      )}
      style={{ backgroundImage: `url(${src})` }}
    />
  );
}

export function PexelsAvatar({ query, className, size = "lg" }) {
  const { image, loading } = usePexelsImage(query, "portrait");
  const src = image?.src?.tiny || image?.src?.small;
  const dim = size === "sm" ? "size-10" : "size-14";

  if (!src || loading) {
    return (
      <div className={cn("shrink-0 rounded-full bg-slate-200", dim, className)} />
    );
  }

  return (
    <div
      className={cn("shrink-0 rounded-full bg-cover bg-center ring-2 ring-white/80", dim, className)}
      style={{ backgroundImage: `url(${src})` }}
    />
  );
}

export function PexelsCardBg({ query, orientation = "landscape", className, children }) {
  const { image, loading } = usePexelsImage(query, orientation);
  const src = image?.src?.medium || image?.src?.large;

  return (
    <div
      className={cn("relative overflow-hidden bg-cover bg-center", className)}
      style={{
        backgroundImage: src && !loading
          ? `linear-gradient(180deg, rgba(15,23,42,0.5), rgba(15,23,42,0.7)), url(${src})`
          : undefined,
        backgroundColor: !src || loading ? "#1e293b" : undefined,
      }}
    >
      {children}
    </div>
  );
}

export function PexelsVideo({ query, className, poster, muted = true, loop = true }) {
  const [videoSrc, setVideoSrc] = useState(null);
  const [loading, setLoading] = useState(true);
  const videoRef = useRef(null);
  const cacheRef = useRef({});

  useEffect(() => {
    if (cacheRef.current[query]) {
      setVideoSrc(cacheRef.current[query]);
      setLoading(false);
      return;
    }

    let cancelled = false;

    const fetchVideo = async () => {
      try {
        const res = await fetch(
          `https://api.pexels.com/videos/search?query=${encodeURIComponent(query)}&per_page=1&orientation=landscape`,
          { headers: { Authorization: PEXELS_API_KEY } }
        );
        if (!res.ok) {
          throw new Error(`Pexels video API error: ${res.status} ${res.statusText}`);
        }
        const data = await res.json();
        if (!cancelled && data.videos?.length) {
          const video = data.videos[0];
          const hdFile = video.video_files.find(f => f.quality === "hd" || f.height >= 720) || video.video_files[0];
          if (hdFile?.link) {
            cacheRef.current[query] = hdFile.link;
            setVideoSrc(hdFile.link);
          }
        }
      } catch (e) {
        console.warn("Pexels video fetch failed:", e);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchVideo();
    return () => { cancelled = true; };
  }, [query]);

  if (!videoSrc || loading) {
    return (
      <div className={cn("flex items-center justify-center bg-slate-900", className)}>
        <div className="size-8 animate-pulse rounded-full bg-slate-700" />
      </div>
    );
  }

  return (
    <video
      ref={videoRef}
      className={cn("object-cover", className)}
      src={videoSrc}
      autoPlay
      muted={muted}
      loop={loop}
      playsInline
      poster={poster}
    />
  );
}