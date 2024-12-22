<template>
  <div class="h-full w-full border-black border-4 rounded-[16px]">
    <div class="absolute text-8xl text-black font-Montserrat font-bold flex h-10 w-[calc(100%-8px)] bg-black rounded-t-lg items-center z-10">
      <div class=" rounded-full bg-red-500 w-4 h-4 mx-2"></div>
      <div class=" rounded-full bg-yellow-500 w-4 h-4 mr-2"></div>
      <div class=" rounded-full bg-green-500 w-4 h-4 mr-2"></div>
    </div>
    <div class="absolute left-5 top-16 text-6xl text-black font-Montserrat font-bold flex h-16">
      <div class="mr-4">$</div>
      <div class="h-full bg-black w-8 cursor-blink"></div>
    </div>
    <div ref="matterContainer" class="w-full h-full matter-container">
      <slot></slot>
      <div class="text font-black">cd /document/github brew go /downloads python3 yelineee cargo npm docker apt-get gem git deno </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue';
import Matter from 'matter-js';

const matterContainer = ref(null);

const splitWords = () => {
  const textNode = document.querySelector(".text");
  const text = textNode.textContent;
  const newDomElements = text.split(" ").map((text) => {
    const filepath = text.startsWith(`/document/github`)|| text.startsWith(`/downloads`) ;
    const name = text.startsWith(`yelineee`) ;
    return `<span class="word ${ filepath ? "filepath" : "" } ${ name ? "name" : "" }">${text}</span>`;
  });
  textNode.innerHTML = newDomElements.join("");
};

const renderCanvas = () => {
  const Engine = Matter.Engine;
  const Render = Matter.Render;
  const World = Matter.World;
  const Bodies = Matter.Bodies;
  const Runner = Matter.Runner;
  const params = {
    isStatic: true,
    render: {
      fillStyle: "transparent"
    }
  };

  const container = matterContainer.value;
  const style = getComputedStyle(container);
  const paddingX = parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
  const paddingY = parseFloat(style.paddingTop) + parseFloat(style.paddingBottom);
  const borderX = parseFloat(style.borderLeftWidth) + parseFloat(style.borderRightWidth);
  const borderY = parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth);
  
  const canvasSize = {
    width: container.clientWidth,
    height: container.clientHeight,
  };

  const engine = Engine.create({});

  const render = Render.create({
    element: container,
    engine: engine,
    options: {
      ...canvasSize,
      background: "rgb(138, 43, 226)",
      wireframes: false
    }
  });
  const floor = Bodies.rectangle(
    canvasSize.width / 2,
    canvasSize.height,
    canvasSize.width,
    50,
    params
  );
  const wall1 = Bodies.rectangle(
    0,
    canvasSize.height / 2,
    100,
    canvasSize.height,
    params
  );
  const wall2 = Bodies.rectangle(
    canvasSize.width,
    canvasSize.height / 2,
    50,
    canvasSize.height,
    params
  );
  const top = Bodies.rectangle(
    canvasSize.width / 2,
    0,
    canvasSize.width,
    50,
    params
  );
  const wordElements = document.querySelectorAll(".word");
  const wordBodies = [...wordElements].map((elemRef) => {
    const width = elemRef.offsetWidth;
    const height = elemRef.offsetHeight;

    return {
      body: Matter.Bodies.rectangle(canvasSize.width / 2, 0, width, height, {
        render: {
          fillStyle: "transparent"
        }
      }),
      elem: elemRef,
      render() {
        const { x, y } = this.body.position;
        this.elem.style.top = `${y - 5}px`;
        this.elem.style.left = `${x - width / 2}px`;
        this.elem.style.transform = `rotate(${this.body.angle}rad)`;
      }
    };
  });

  const mouse = Matter.Mouse.create(container);
  const mouseConstraint = Matter.MouseConstraint.create(engine, {
    mouse,
    constraint: {
      stiffness: 0.2,
      render: {
        visible: false
      }
    }
  });
  mouse.element.removeEventListener("mousewheel", mouse.mousewheel);
  mouse.element.removeEventListener("DOMMouseScroll", mouse.mousewheel);

  World.add(engine.world, [
    floor,
    wall1,
    wall2,
    top,
    mouseConstraint
  ]);
  render.mouse = mouse;
  Runner.run(engine);
  Render.run(render);

  let index = 0;
  const addWordBody = () => {
    if (index < wordBodies.length) {
      World.add(engine.world, wordBodies[index].body);
      index++;
      setTimeout(addWordBody, 200);
    }
  };
  addWordBody();

  (function rerender() {
    wordBodies.forEach((element) => {
      element.render();
    });
    Matter.Engine.update(engine);
    requestAnimationFrame(rerender);
  })();
    wordBodies.forEach((wordBody) => {
    const forceMagnitude = 0.06 * wordBody.body.mass;
    Matter.Body.applyForce(wordBody.body, wordBody.body.position, {
      x: (Math.random() - 0.5) * forceMagnitude,
      y: 0
    });
  });
};

onMounted(() => {
  splitWords();
  renderCanvas();
});

onBeforeUnmount(() => {
  // Cleanup Matter.js resources on component unmount
  Matter.Render.stop(render);
  Matter.Runner.stop(runner);
  Matter.World.clear(engine.world);
  Matter.Engine.clear(engine);
});
</script>

<style>
.word {
  position: absolute;
  display: inline-block;
  white-space: nowrap;
  cursor: grab;
  font-size: 36px;
  font-weight: 900;
  font-family: Montserrat;
  color: #fff;
  user-select: none; 
}

.filepath {
  color: #f4d53f;
}

.name {
  color: #ea6200;
}

.cursor-blink {
  animation: blink 1s step-start infinite;
}

@keyframes blink {
  0%, 100% {
    opacity: 1;
  }
  5%, 95% {
    opacity: 0.9;
  }
  50% {
    opacity: 0;
  }
}

.matter-container {
  border-radius: 12px; 
  overflow: hidden; 
}

.live-background {
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  animation: gradient 15s ease infinite;
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>
