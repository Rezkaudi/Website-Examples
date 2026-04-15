/* ══════════════════════════════════════════
   PRELOADER
   ══════════════════════════════════════════ */
(function () {
    const fill = document.getElementById('preloader-fill');
    const percent = document.getElementById('preloader-percent');
    const preloader = document.getElementById('preloader');
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 15 + 5;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            setTimeout(() => preloader.classList.add('hidden'), 400);
        }
        fill.style.width = progress + '%';
        percent.textContent = Math.round(progress) + '%';
    }, 120);
})();

/* ══════════════════════════════════════════
   CUSTOM CURSOR
   ══════════════════════════════════════════ */
(function () {
    const dot = document.getElementById('cursor-dot');
    const ring = document.getElementById('cursor-ring');
    if (!dot || !ring) return;
    let mouseX = -100, mouseY = -100, ringX = -100, ringY = -100;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX; mouseY = e.clientY;
        dot.style.left = mouseX - 4 + 'px';
        dot.style.top = mouseY - 4 + 'px';
    });

    (function animateRing() {
        ringX += (mouseX - ringX) * 0.12;
        ringY += (mouseY - ringY) * 0.12;
        ring.style.left = ringX - 18 + 'px';
        ring.style.top = ringY - 18 + 'px';
        requestAnimationFrame(animateRing);
    })();

    document.querySelectorAll('a, button, .work-card, .service-card, .stat-item, .contact-link').forEach(el => {
        el.addEventListener('mouseenter', () => ring.classList.add('hovering'));
        el.addEventListener('mouseleave', () => ring.classList.remove('hovering'));
    });
})();

/* ══════════════════════════════════════════
   THREE.JS — MORPHING PARTICLE SPHERE
   ══════════════════════════════════════════ */
(function () {
    const container = document.getElementById('canvas-container');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Particle system — 4000 points in a sphere with noise-based morphing
    const COUNT = 4000;
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(COUNT * 3);
    const col = new Float32Array(COUNT * 3);
    const siz = new Float32Array(COUNT);

    for (let i = 0; i < COUNT; i++) {
        const phi = Math.acos(2 * Math.random() - 1);
        const theta = Math.random() * Math.PI * 2;
        const r = 1.8 + (Math.random() - 0.5) * 0.3;
        pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        pos[i * 3 + 2] = r * Math.cos(phi);

        const v = 0.4 + Math.random() * 0.4;
        col[i * 3] = 0.91 * v; col[i * 3 + 1] = 0.45 * v; col[i * 3 + 2] = 0.60 * v;

        siz[i] = Math.random() * 2 + 0.5;
    }

    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
    geo.setAttribute('size', new THREE.BufferAttribute(siz, 1));

    const vertexShader = `
        attribute float size;
        varying vec3 vColor;
        uniform float uTime;
        uniform float uMorph;

        vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
        vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
        vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}

        float snoise(vec3 v){
            const vec2 C=vec2(1.0/6.0,1.0/3.0);
            const vec4 D=vec4(0.0,0.5,1.0,2.0);
            vec3 i=floor(v+dot(v,C.yyy));
            vec3 x0=v-i+dot(i,C.xxx);
            vec3 g=step(x0.yzx,x0.xyz);
            vec3 l=1.0-g;
            vec3 i1=min(g.xyz,l.zxy);
            vec3 i2=max(g.xyz,l.zxy);
            vec3 x1=x0-i1+C.xxx;
            vec3 x2=x0-i2+C.yyy;
            vec3 x3=x0-D.yyy;
            i=mod289(i);
            vec4 p=permute(permute(permute(
                i.z+vec4(0.0,i1.z,i2.z,1.0))
                +i.y+vec4(0.0,i1.y,i2.y,1.0))
                +i.x+vec4(0.0,i1.x,i2.x,1.0));
            float n_=0.142857142857;
            vec3 ns=n_*D.wyz-D.xzx;
            vec4 j=p-49.0*floor(p*ns.z*ns.z);
            vec4 x_=floor(j*ns.z);
            vec4 y_=floor(j-7.0*x_);
            vec4 x=x_*ns.x+ns.yyyy;
            vec4 y=y_*ns.x+ns.yyyy;
            vec4 h=1.0-abs(x)-abs(y);
            vec4 b0=vec4(x.xy,y.xy);
            vec4 b1=vec4(x.zw,y.zw);
            vec4 s0=floor(b0)*2.0+1.0;
            vec4 s1=floor(b1)*2.0+1.0;
            vec4 sh=-step(h,vec4(0.0));
            vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
            vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
            vec3 p0=vec3(a0.xy,h.x);
            vec3 p1=vec3(a0.zw,h.y);
            vec3 p2=vec3(a1.xy,h.z);
            vec3 p3=vec3(a1.zw,h.w);
            vec4 norm=1.79284291400159-0.85373472095314*vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3));
            p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
            vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);
            m=m*m;
            return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
        }

        void main(){
            vColor=color;
            vec3 p=position;
            float n1=snoise(p*0.8+uTime*0.15)*0.5;
            float n2=snoise(p*1.2-uTime*0.1)*0.3;
            p+=normalize(p)*n1*(1.0+uMorph*0.5);
            p+=normalize(p)*n2*uMorph;
            p*=1.0+sin(uTime*0.5)*0.05;
            vec4 mv=modelViewMatrix*vec4(p,1.0);
            gl_PointSize=size*(200.0/-mv.z);
            gl_Position=projectionMatrix*mv;
        }
    `;

    const fragmentShader = `
        varying vec3 vColor;
        void main(){
            float d=length(gl_PointCoord-vec2(0.5));
            if(d>0.5)discard;
            float a=1.0-smoothstep(0.0,0.5,d);
            gl_FragColor=vec4(vColor,a*0.35);
        }
    `;

    const mat = new THREE.ShaderMaterial({
        vertexShader, fragmentShader,
        uniforms: { uTime: { value: 0 }, uMorph: { value: 0 } },
        transparent: true, depthWrite: false, blending: THREE.NormalBlending, vertexColors: true
    });

    const particles = new THREE.Points(geo, mat);
    scene.add(particles);

    // Background dust
    const dustCount = 800;
    const dustGeo = new THREE.BufferGeometry();
    const dPos = new Float32Array(dustCount * 3);
    const dSiz = new Float32Array(dustCount);
    for (let i = 0; i < dustCount; i++) {
        dPos[i * 3] = (Math.random() - 0.5) * 20;
        dPos[i * 3 + 1] = (Math.random() - 0.5) * 20;
        dPos[i * 3 + 2] = (Math.random() - 0.5) * 20;
        dSiz[i] = Math.random() * 1.5 + 0.5;
    }
    dustGeo.setAttribute('position', new THREE.BufferAttribute(dPos, 3));
    dustGeo.setAttribute('size', new THREE.BufferAttribute(dSiz, 1));

    const dustMat = new THREE.ShaderMaterial({
        vertexShader: `
            attribute float size;
            uniform float uTime;
            varying float vAlpha;
            void main(){
                vec3 p=position;
                p.y+=sin(uTime*0.2+position.x*0.5)*0.3;
                p.x+=cos(uTime*0.15+position.z*0.3)*0.2;
                vec4 mv=modelViewMatrix*vec4(p,1.0);
                gl_PointSize=size*(100.0/-mv.z);
                gl_Position=projectionMatrix*mv;
                vAlpha=0.15+0.1*sin(uTime+position.x);
            }
        `,
        fragmentShader: `
            varying float vAlpha;
            void main(){
                float d=length(gl_PointCoord-vec2(0.5));
                if(d>0.5)discard;
                float a=(1.0-smoothstep(0.0,0.5,d))*vAlpha;
                gl_FragColor=vec4(0.91,0.45,0.60,a);
            }
        `,
        uniforms: { uTime: { value: 0 } },
        transparent: true, depthWrite: false, blending: THREE.NormalBlending
    });
    scene.add(new THREE.Points(dustGeo, dustMat));

    // Mouse + scroll tracking
    let mouseX = 0, mouseY = 0, tMouseX = 0, tMouseY = 0;
    let scrollMorph = 0, targetMorph = 0;

    document.addEventListener('mousemove', (e) => {
        tMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        tMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    window.addEventListener('scroll', () => {
        targetMorph = window.scrollY / (document.body.scrollHeight - window.innerHeight);
    });

    const clock = new THREE.Clock();
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    (function animate() {
        requestAnimationFrame(animate);
        const t = clock.getElapsedTime();

        mouseX += (tMouseX - mouseX) * 0.05;
        mouseY += (tMouseY - mouseY) * 0.05;
        scrollMorph += (targetMorph - scrollMorph) * 0.05;

        mat.uniforms.uTime.value = t;
        mat.uniforms.uMorph.value = reducedMotion ? 0 : scrollMorph * 3;
        dustMat.uniforms.uTime.value = t;

        particles.rotation.y = t * 0.05 + mouseX * 0.3;
        particles.rotation.x = mouseY * 0.2;

        camera.position.x = mouseX * 0.3;
        camera.position.y = -mouseY * 0.2;
        camera.lookAt(0, 0, 0);

        const s = Math.max(1 - scrollMorph * 0.3, 0.5);
        particles.scale.setScalar(s);

        renderer.render(scene, camera);
    })();

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });
})();

/* ══════════════════════════════════════════
   GSAP ANIMATIONS
   ══════════════════════════════════════════ */
gsap.registerPlugin(ScrollTrigger);

// Hero entrance
gsap.timeline({ delay: 1.2 })
    .to('.hero-tag', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' })
    .to('.hero-title', { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }, '-=0.5')
    .to('.hero-description', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6')
    .to('.hero-cta', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.5')
    .to('.scroll-indicator', { opacity: 1, duration: 0.6 }, '-=0.3');

// Hero parallax on scroll
gsap.to('.hero-content', {
    y: -100, opacity: 0, ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 }
});
gsap.to('.scroll-indicator', {
    opacity: 0,
    scrollTrigger: { trigger: '.hero', start: '10% top', end: '20% top', scrub: 1 }
});

// Scroll reveals
document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
    const from = { opacity: 0 };
    const to = { opacity: 1, duration: 1, ease: 'power3.out' };

    if (el.classList.contains('reveal')) { from.y = 40; to.y = 0; }
    else if (el.classList.contains('reveal-left')) { from.x = -40; to.x = 0; }
    else if (el.classList.contains('reveal-right')) { from.x = 40; to.x = 0; }
    else if (el.classList.contains('reveal-scale')) { from.scale = 0.9; to.scale = 1; }

    gsap.fromTo(el, from, {
        ...to,
        scrollTrigger: { trigger: el, start: 'top 85%', end: 'top 60%', toggleActions: 'play none none reverse' }
    });
});

// Service cards stagger
gsap.utils.toArray('.service-card').forEach((card, i) => {
    gsap.fromTo(card, { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 0.8, delay: i * 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: card, start: 'top 85%', toggleActions: 'play none none reverse' }
    });
});

// Work cards
gsap.utils.toArray('.work-card').forEach((card, i) => {
    gsap.fromTo(card, { opacity: 0, scale: 0.92, y: 30 }, {
        opacity: 1, scale: 1, y: 0, duration: 0.9, delay: i * 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: card, start: 'top 85%', toggleActions: 'play none none reverse' }
    });
});

// Testimonials
gsap.utils.toArray('.testimonial-card').forEach((card, i) => {
    gsap.fromTo(card, { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 0.8, delay: i * 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: card, start: 'top 85%', toggleActions: 'play none none reverse' }
    });
});

// Stats counter
document.querySelectorAll('.stat-number[data-count]').forEach(counter => {
    const target = parseInt(counter.dataset.count);
    ScrollTrigger.create({
        trigger: counter, start: 'top 85%', once: true,
        onEnter: () => {
            gsap.to({ val: 0 }, {
                val: target, duration: 2, ease: 'power2.out',
                onUpdate() { counter.textContent = Math.round(this.targets()[0].val) + '+'; }
            });
        }
    });
});

/* ══════════════════════════════════════════
   NAVIGATION
   ══════════════════════════════════════════ */
window.addEventListener('scroll', () => {
    document.getElementById('nav').classList.toggle('scrolled', window.scrollY > 50);
    document.getElementById('scroll-progress').style.width =
        (window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100) + '%';
});

// Mobile menu
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
});
mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    menuBtn.classList.remove('active');
    mobileMenu.classList.remove('active');
    document.body.style.overflow = '';
}));

/* ══════════════════════════════════════════
   PROCESS TIMELINE
   ══════════════════════════════════════════ */
(function () {
    const steps = document.querySelectorAll('.process-step');
    const lineFill = document.getElementById('process-line-fill');
    if (!steps.length || !lineFill) return;

    steps.forEach((step) => {
        ScrollTrigger.create({
            trigger: step,
            start: 'top 70%',
            onEnter: () => step.classList.add('active'),
            onLeaveBack: () => step.classList.remove('active'),
        });

        gsap.fromTo(step, { opacity: 0, y: 40 }, {
            opacity: 1, y: 0, duration: 0.8, delay: 0, ease: 'power3.out',
            scrollTrigger: { trigger: step, start: 'top 85%', toggleActions: 'play none none reverse' }
        });
    });

    // Animate the timeline line fill based on scroll progress through the process section
    gsap.to(lineFill, {
        height: '100%',
        ease: 'none',
        scrollTrigger: {
            trigger: '.process-timeline',
            start: 'top 60%',
            end: 'bottom 40%',
            scrub: 0.5,
        }
    });
})();

/* ══════════════════════════════════════════
   SMOOTH SCROLL
   ══════════════════════════════════════════ */
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
        e.preventDefault();
        const el = document.querySelector(a.getAttribute('href'));
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});
