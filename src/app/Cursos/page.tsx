'use client';

import { useState, useEffect, useRef } from 'react';

const banners = [
  {
    id: 4,
    titulo: "Sessão “Renda Extra”",
    descricao: "💡 Aprenda a montar e vender cestas com alto lucro!",
    linkCompra: "https://linkdocompra.com/renda-extra",
    detalhes: [
      "Curso completo para montar cestas personalizadas",
      "Dicas de fornecedores e logística",
      "Como calcular o preço e maximizar lucro",
    ],
    preco: "R$ 299,00",
    bgColorStart: "#ff3b30",
    bgColorEnd: "#ff6f61",
  },
  {
    id: 2,
    titulo: "Curso de Marketing Digital",
    descricao: "Domine as estratégias para vender mais online!",
    linkCompra: "https://linkdocompra.com/marketing-digital",
    detalhes: [
      "Técnicas de SEO e tráfego pago",
      "Como criar campanhas que convertem",
      "Gestão de redes sociais e funis de vendas",
    ],
    preco: "R$ 399,00",
    bgColorStart: "#007bff",
    bgColorEnd: "#0056b3",
  },
  {
    id: 6,
    titulo: "Curso de Fotografia",
    descricao: "Aprenda a tirar fotos profissionais com seu celular!",
    linkCompra: "https://linkdocompra.com/fotografia",
    detalhes: [
      "Noções de enquadramento e iluminação",
      "Edição rápida com apps gratuitos",
      "Transforme seu celular em câmera profissional",
    ],
    preco: "R$ 249,00",
    bgColorStart: "#28a745",
    bgColorEnd: "#19692c",
  },
  {
    id: 7,
    titulo: "Curso Avançado de Programação",
    descricao: "Domine linguagens modernas e frameworks!",
    linkCompra: "https://linkdocompra.com/programacao-avancada",
    detalhes: [
      "JavaScript, TypeScript e React",
      "Back-end com Node.js e APIs REST",
      "Melhores práticas e patterns",
    ],
    preco: "R$ 499,00",
    bgColorStart: "#6f42c1",
    bgColorEnd: "#4e318a",
  },
  {
    id: 12,
    titulo: "Workshop de Inteligência Artificial",
    descricao: "Introdução prática à IA com Python!",
    linkCompra: "https://linkdocompra.com/ia-python",
    detalhes: [
      "Fundamentos de Machine Learning",
      "Criação de modelos simples",
      "Aplicações reais e projetos hands-on",
    ],
    preco: "R$ 399,00",
    bgColorStart: "#fd7e14",
    bgColorEnd: "#b25500",
  },
];

export default function Cursos() {
  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(true);
  const detalhesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % banners.length);
        setFade(true);
      }, 600);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const banner = banners[current];

  function scrollParaDetalhes() {
    if (detalhesRef.current) {
      detalhesRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  return (
    <>
      {/* Header fixo */}
      <header
        style={{
          position: 'fixed',
          top: 0,
          width: '100%',
          backgroundColor: '#121212',
          padding: '1rem 2rem',
          display: 'flex',
          justifyContent: 'flex-end',
          boxShadow: '0 2px 8px rgba(0,0,0,0.7)',
          zIndex: 1000,
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        }}
      >
        <a
          href="/login"
          style={{
            color: '#ff3b30',
            fontWeight: '700',
            textDecoration: 'none',
            fontSize: '1.15rem',
            padding: '0.65rem 1.8rem',
            border: '2px solid #ff3b30',
            borderRadius: '40px',
            boxShadow: '0 0 10px #ff3b30aa',
            transition: 'all 0.3s ease',
            userSelect: 'none',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#ff3b30';
            e.currentTarget.style.color = '#fff';
            e.currentTarget.style.boxShadow = '0 0 20px #ff3b30dd';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = '#ff3b30';
            e.currentTarget.style.boxShadow = '0 0 10px #ff3b30aa';
          }}
          aria-label="Entrar na plataforma"
        >
          Entrar na Plataforma
        </a>
      </header>

      {/* Espaço para header fixo */}
      <div style={{ height: '64px' }} />

      {/* Banner rotativo */}
      <main
        style={{
          background: `linear-gradient(135deg, ${banner.bgColorStart}, ${banner.bgColorEnd})`,
          minHeight: '85vh',
          color: '#fff',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          padding: '3rem 1.5rem',
          borderRadius: '0 0 48px 48px',
          userSelect: 'none',
          boxShadow: '0 16px 48px rgba(0,0,0,0.7)',
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          position: 'relative',
          transition: 'opacity 0.6s ease',
          opacity: fade ? 1 : 0,
        }}
        aria-live="polite"
        aria-atomic="true"
      >
        <h1
          style={{
            fontSize: '3.8rem',
            fontWeight: '900',
            marginBottom: '1.25rem',
            textTransform: 'uppercase',
            textShadow: '4px 4px 14px rgba(0,0,0,0.9)',
            letterSpacing: '0.12em',
            maxWidth: '90%',
            lineHeight: 1.1,
          }}
        >
          {banner.titulo}
        </h1>
        <p
          style={{
            fontSize: '1.65rem',
            marginBottom: '2.5rem',
            fontStyle: 'italic',
            textShadow: '2px 2px 8px rgba(0,0,0,0.7)',
            maxWidth: '640px',
          }}
        >
          {banner.descricao}
        </p>
        <button
          onClick={scrollParaDetalhes}
          style={{
            padding: '1.2rem 3.5rem',
            backgroundColor: '#fff',
            color: banner.bgColorStart,
            fontWeight: '800',
            fontSize: '1.4rem',
            borderRadius: '48px',
            boxShadow: `0 10px 30px ${banner.bgColorStart}cc`,
            border: 'none',
            cursor: 'pointer',
            textDecoration: 'none',
            transition: 'all 0.3s ease',
            userSelect: 'none',
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = banner.bgColorStart;
            e.currentTarget.style.color = '#fff';
            e.currentTarget.style.boxShadow = `0 15px 40px ${banner.bgColorStart}dd`;
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#fff';
            e.currentTarget.style.color = banner.bgColorStart;
            e.currentTarget.style.boxShadow = `0 10px 30px ${banner.bgColorStart}cc`;
            e.currentTarget.style.transform = 'scale(1)';
          }}
          aria-label={`Ver detalhes do curso ${banner.titulo}`}
        >
          Ver Detalhes
        </button>

        {/* Indicadores */}
        <div
          style={{
            position: 'absolute',
            bottom: '20px',
            display: 'flex',
            gap: '12px',
            justifyContent: 'center',
            width: '100%',
            left: 0,
          }}
        >
          {banners.map((b, i) => (
            <button
              key={b.id}
              onClick={() => {
                setFade(false);
                setTimeout(() => {
                  setCurrent(i);
                  setFade(true);
                }, 300);
              }}
              style={{
                width: '14px',
                height: '14px',
                borderRadius: '50%',
                border: '2px solid #fff',
                backgroundColor: i === current ? '#fff' : 'transparent',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              aria-label={`Selecionar banner ${b.titulo}`}
              aria-pressed={i === current}
            />
          ))}
        </div>
      </main>

      {/* Detalhes do curso */}
      <section
        ref={detalhesRef}
        style={{
          maxWidth: '740px',
          margin: '4rem auto 6rem auto',
          padding: '0 1rem',
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          color: '#222',
          userSelect: 'text',
        }}
        aria-labelledby="detalhes-titulo"
      >
        <h2
          id="detalhes-titulo"
          style={{
            fontSize: '2.6rem',
            marginBottom: '1.5rem',
            fontWeight: '700',
            textAlign: 'center',
            color: banners[current].bgColorStart,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            textShadow: `1px 1px 3px ${banners[current].bgColorEnd}aa`,
          }}
        >
          Detalhes do Curso: {banner.titulo}
        </h2>
        <ul
          style={{
            listStyle: 'none',
            paddingLeft: 0,
            fontSize: '1.25rem',
            lineHeight: 1.6,
            maxWidth: '620px',
            margin: '0 auto',
          }}
        >
          {banner.detalhes.map((item, idx) => (
            <li
              key={idx}
              style={{
                marginBottom: '0.9rem',
                paddingLeft: '1.2rem',
                position: 'relative',
                fontWeight: '600',
                color: '#444',
              }}
            >
              <span
                style={{
                  position: 'absolute',
                  left: 0,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '0.9rem',
                  height: '0.9rem',
                  backgroundColor: banner.bgColorStart,
                  borderRadius: '50%',
                }}
                aria-hidden="true"
              />
              {item}
            </li>
          ))}
        </ul>
        <p
          style={{
            textAlign: 'center',
            fontWeight: '900',
            fontSize: '1.9rem',
            marginTop: '3rem',
            color: banner.bgColorStart,
            textShadow: `1px 1px 6px ${banner.bgColorEnd}bb`,
          }}
        >
          Investimento: {banner.preco}
        </p>
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <a
            href={banner.linkCompra}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              padding: '1rem 3.5rem',
              fontWeight: '700',
              fontSize: '1.5rem',
              borderRadius: '48px',
              backgroundColor: banner.bgColorStart,
              color: '#fff',
              boxShadow: `0 10px 30px ${banner.bgColorEnd}`,
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              userSelect: 'none',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = banner.bgColorEnd;
              e.currentTarget.style.boxShadow = `0 15px 40px ${banner.bgColorStart}dd`;
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = banner.bgColorStart;
              e.currentTarget.style.boxShadow = `0 10px 30px ${banner.bgColorEnd}`;
              e.currentTarget.style.transform = 'scale(1)';
            }}
            aria-label={`Comprar curso ${banner.titulo}`}
          >
            Comprar Agora
          </a>
        </div>
      </section>
    </>
  );
}
