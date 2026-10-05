import React, { useEffect, useRef } from 'react';

export const InteractiveCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 600);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
      initNodes();
    };

    window.addEventListener('resize', handleResize);

    // Particle nodes
    interface Node {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      type: 'sensor' | 'compute' | 'mesh';
      pulse: number;
    }

    let nodes: Node[] = [];
    const nodeCount = Math.min(Math.floor((width * height) / 14000), 55);

    const initNodes = () => {
      nodes = [];
      for (let i = 0; i < nodeCount; i++) {
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.45,
          vy: (Math.random() - 0.5) * 0.45,
          radius: Math.random() > 0.85 ? 3 : 1.8,
          type: Math.random() > 0.7 ? 'compute' : 'sensor',
          pulse: Math.random() * Math.PI * 2
        });
      }
    };

    initNodes();

    let mouseX = -1000;
    let mouseY = -1000;

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        mouseX = e.touches[0].clientX - rect.left;
        mouseY = e.touches[0].clientY - rect.top;
      }
    };

    const onMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    canvas.parentElement?.addEventListener('mousemove', onMouseMove);
    canvas.parentElement?.addEventListener('mouseleave', onMouseLeave);
    canvas.parentElement?.addEventListener('touchmove', onTouchMove, { passive: true });
    canvas.parentElement?.addEventListener('touchend', onMouseLeave, { passive: true });

    let time = 0;

    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      // Subtle CAD concentric coordinate markers
      ctx.strokeStyle = 'rgba(14, 165, 233, 0.1)';
      ctx.lineWidth = 1;

      // Draw faint crosshair grid at center
      const cx = width * 0.65;
      const cy = height * 0.5;
      ctx.beginPath();
      ctx.arc(cx, cy, 140, 0, Math.PI * 2);
      ctx.arc(cx, cy, 280, 0, Math.PI * 2);
      ctx.moveTo(cx - 320, cy);
      ctx.lineTo(cx + 320, cy);
      ctx.moveTo(cx, cy - 320);
      ctx.lineTo(cx, cy + 320);
      ctx.stroke();

      // Rotating radar angle sweep (scientific instrument style)
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(time * 0.3);
      const sweepGradient = ctx.createLinearGradient(0, 0, 200, 0);
      sweepGradient.addColorStop(0, 'rgba(14, 165, 233, 0.2)');
      sweepGradient.addColorStop(1, 'rgba(14, 165, 233, 0)');
      ctx.strokeStyle = sweepGradient;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(240, 0);
      ctx.stroke();
      ctx.restore();

      // Update and connect nodes
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        node.x += node.vx;
        node.y += node.vy;
        node.pulse += 0.04;

        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        // Mouse gentle repulsion
        const dxMouse = node.x - mouseX;
        const dyMouse = node.y - mouseY;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        if (distMouse < 120) {
          node.x += (dxMouse / distMouse) * 1.2;
          node.y += (dyMouse / distMouse) * 1.2;
        }

        // Draw connections
        for (let j = i + 1; j < nodes.length; j++) {
          const other = nodes[j];
          const dx = node.x - other.x;
          const dy = node.y - other.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            const alpha = (1 - dist / 130) * 0.25;
            ctx.strokeStyle = `rgba(2, 132, 199, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();
          }
        }

        // Draw node dot
        ctx.beginPath();
        const currentRadius = node.radius + Math.sin(node.pulse) * 0.4;
        ctx.arc(node.x, node.y, Math.max(1, currentRadius), 0, Math.PI * 2);
        if (node.type === 'compute') {
          ctx.fillStyle = 'rgba(2, 132, 199, 0.85)';
        } else {
          ctx.fillStyle = 'rgba(5, 150, 105, 0.8)';
        }
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      canvas.parentElement?.removeEventListener('mousemove', onMouseMove);
      canvas.parentElement?.removeEventListener('mouseleave', onMouseLeave);
      canvas.parentElement?.removeEventListener('touchmove', onTouchMove);
      canvas.parentElement?.removeEventListener('touchend', onMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none w-full h-full opacity-80"
    />
  );
};
