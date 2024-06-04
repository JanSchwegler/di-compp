“unknown life” is a project I developed during the Computation Perception Extended (COMPP) FS24 module. At the start of the module I didn’t have much experience with AI’s. I did know and use ChatGPT, Adobe Firefly and Gemini from Google. During the module, I was introduced to the large world of AI. I explored various types of AI, learning about their mechanisms, construction, how they learn and even how to train my own model. In this journey, I got to know and explore many different models.
This documentation summarises my concept, my methods as well as my learnings for future reference.

# Projectdescription
The project unknown life is an explorative work to explore stable diffusion’s capabilities. During the project I challenged today's open source image generation to create images beyond its training data, exploring the boundaries of its understanding and the resulting images.

During the project, I challenged the AI to generate photorealistic images of fictional creatures, or in other words, animals not found on Earth. Since today's AIs are primarily trained on photos of real animals and human drawings, this task required the AI to adapt and maintain a photorealistic style while creating something entirely new. During the project I used only text prompts, describing the animals based on their characteristics without specifically naming any. This pushed the AI to interpret and visualise unique features beyond its training data.

I asked myself following questions at the beginning of the project:

- How specific can I describe the images, the characteristics of the animal and how many details can the AI include?
- What details are more challenging for the AI to include?
- How consistent is the AI with the generated images?
- Can I define specific surroundings without losing details of the creature?

These questions guided me throughout the entire project. In search of the answers, I wrote numerous prompts, generated images and gathered experience.

Due to limited time and resources, I couldn't explore everything. Therefore, I defined the boundaries of my project and identified aspects I wasn't testing:

- I didn't use more than text prompts.
- I didn't include multiple creatures in one image.
- I didn't explore different styles.
- I didn't experiment with different points of view.
- I didn't experiment  with the colour scheme.
- I didn't compare different models and LoRAs.
- I didn't vary settings, quality, and image sizes.
- I didn't create my own dataset or train models.

# Installation
This chapter shows the different tools I used for the project and provides a detailed description of my installation process. 

## WebUI
In the beginning, I installed Stable Diffusion locally on my laptop. First, I checked the web to see the installation processes used by others. For the first installation, I decided to use the WebUI and install it via the terminal, as we did in class on the gpuhub. I very rarely open the terminal and especially had never installed anything using it before, so this process was new to me. However, I was excited to try it. For the installation process, I used the following resource:

- The setup file we used on the gpuhub (sd-webui-fooocus.ipynb)
- https://www.youtube.com/watch?v=onmqbI5XPH8
- https://www.youtube.com/watch?v=pXvT9hdJ2_g

Installation steps:
- I already have git installed, so i skipped this step
- I installed python version 3.10.6. (It's important to use a 3.10 version, otherwise it won’t work! I learned this the hard way.)
  - If you encounter issues due to the wrong Python version, ensure you only have a 3.10 version installed. Then, delete the "venv" folder from the WebUI directory. This solution was suggested on Reddit: https://www.reddit.com/r/StableDiffusion/comments/yoizz8/i_am_trying_to_install_stable_diffusion_however/
- Create new folder named “stable-diffusion”
- Type “cmd” in the folders directory (as shown in my second resource)
- Clone the WebUI from GitHub (https://github.com/AUTOMATIC1111/stable-diffusion-webui) using the following command in the console:

```git clone https://github.com/AUTOMATIC1111/stable-diffusion-webui.git```

- I downloaded following models:
  - Stable Diffusion XL Base 1.0 (https://huggingface.co/stabilityai/stable-diffusion-xl-base-1.0/tree/main)
  - Stable Diffusion XL Refiner 1.0 (https://huggingface.co/stabilityai/stable-diffusion-xl-refiner-1.0/tree/main)
  - Stable Diffusion XL v1.5 (https://huggingface.co/runwayml/stable-diffusion-v1-5)
- Move the models to the WebUI directory (stable-diffusion\stable-diffusion-webui\models\Stable-diffusion)
- In the main WebUI directory I modified following files:
  - “webui.sh”: On line 26 i changed ```use_venv=1``` to ```use_venv=0```
  ![](/docs/installation-webui-image1.png)
  - “webui-user.sh”: I pasted following in line 14: ```export COMMANDLINE_ARGS="--xformers --share --api --update-check --update-all-extensions --enable-insecure-extension-access --opt-sdp-attention```
  ![](/docs/installation-webui-image2.png)
  - “webui-user.bat”: add ```git pull``` on the first line.
  ![](/docs/installation-webui-image3.png)
- Launch the webui-user.bat file with a double click. This opens the Terminal. If there are errors, read and try to fix them before launching the file again. When there is no error shown, wait for everything to install and load. Once finished, the WebUI will automatically open in the browser or display the URL to open the UI.
- For closing the WebUI, I assumed, you can simply close the console.

## LoRAs
The third resource on the installation process for the WebUI suggested downloading the “Think Diffusion XL” Lora. This Lora was made for the Stable Diffusion SDXL 1.0.After a quick search, I also downloaded “PicX real” which was made for SD 1.5. 

- https://civitai.com/models/169868/thinkdiffusionxl
- https://civitai.com/models/241415/picxreal?modelVersionId=272376


## Conda
Later in the semester, during the lesson on the local installation, I learned about building a virtual environment for applications  like Stable Diffusion. This approach ensures that packages are not installed globally, allows the use of multiple Python versions in different environments, and enables easy removal and setup of environments without affecting other components or applications. To create and manage virtual environments you can use for example Anaconda or Docker:

- https://www.anaconda.com/
- https://www.docker.com/

I wasn't familiar with either of them. So after reviewing both, I downloaded Miniconda and created a new virtual environment. Besides learning how to use the command line, I didn't run into any issues. For the installation of the WebUI, I encountered an issue: I didn’t manage to run the WebUI inside of my environment. After I spent a lot of time running, reinstalling and reviewing, I came to the conclusion to run WebUI outside of Conda. I made this decision because I didn't want to spend more time on the installation and mainly because the WebUI creates a virtual environment on its own. So it’s similar to coda, all the packages and the python version live separate to the operating system inside the WebUI folder. The only downside is that you need the correct version of python (3.10) at least when initialising the WebUI. 

Later on, I realised Conda intends to have your files (for me the WebUI) in a separate place and just run them from your Conda environment. Despite this, I chose not to use Conda environments, because everything works and I’m happy about the setup. I’m glad I had this realisation, so I can use code for further installations or projects. 

Important commands i used for managing the conda environments:
- List conda environments: **conda env list**
- Create environment: **conda create -n envname python=3.10.6**
- Remove environment: **conda env remove -n envname**
- Activate environment: **conda activate envname**
- Deactivate environment: **conda deactivate**
- Create folder: **mkdir folder**
- Move into folder: **cd folder**
- Leave folder: **cd ..**

## Fooocus
I also wanted to use Fooocus for my project on my laptop, so I went to its Github page:
https://github.com/lllyasviel/Fooocus

After the previous installations, I felt more confident and knew what to expect. I read through the installation process in the README file and followed the instructions. Since Fooocus runs in its own folder and environment, I didn't have to look out for any version conflicts. I downloaded the files, unzipped them next to the previously installed WebUI and installed it while running the “run.bat”. Now Fooocus was ready to use without any issues.


# The Model
After the installation, I had the following running models and options on my laptop, ready to use:
- SDXL 1.0
- SDXL 1.0 with the Lora “ThinkDiffusionXL”
- SD 1.5
- SD 1.5 with the Lora “PicX_real”
- Fooocus (v2.3.1 / v2.4.0 with “JuggernautXL v8”)

For my initial impression, I explored these models with different settings. I wanted to understand their capabilities and differences. I explored the behaviour and also the differences between the models with the same prompt and how the output changes between the different models. 

At the beginning of the project I knew I couldn't explore everything in depth of all the models and possibilities. However, my goal was to explore the extent of what I could achieve and identify any limitations with my resources today. 
However, my goal was to generally explore how far I can go and what was not possible with my resources today. After a short time of testing i came to the conclusion that exploring the difference of the models with all settings, Loras and also just the prompt possibilities while still exploring the boundaries for creating non earth life, was too much for the project size. So I made some important decisions to specify my research. 

For this project, I’ve chosen to work exclusively with Fooocus. I opted Fooocus because with the other models I had a really hard time getting a realistic look on non-realistic subjects. With Fooocus on the other hand, I always got a photorealistic look. But because of this, I was more limited with its imagination of new life. Further I decided to only use the default settings and the default styles:

- Preset: Initial
- Performance: Speed
- Styles: Fooocus V2 / Fooocus Enhance / Fooocus Sharp
- Guidance Scale: 4
- Sharpness: 2

With this base set, I continued with the main part of the project: prompting, generating and exploring.

# Prompting
Prompt crafting is an important part of my project. At the beginning I wasn't experienced and did not know what to look for and how to structure my prompts. As I mentioned earlier, I only used text prompts to describe the various animals with their characteristics. I didn’t limit myself on weighting and positive prompts, but I ended up not really using any weighting or negative prompts. I found that tweaking my wording was more effective than adjusting and playing around with multiple parameters.

Fast i got some basics together:
- Keep it short
- Simple and clear wording
- Build up keywords instead of long explanation in texts
- Start with general idea

I read into some general prompt crafting techniques for Stable Diffusion and looked at a lot of examples, to compare the prompts with the output. Based on those examples and some testing I figured following prompt structure guide for my project: 
- “Creature with”
- Creature details: skin, legs, eyes, ears, etc.
- Surrounding and maybe basic posture
- “Full body”

# Findings
In this chapter, I will present the findings of my exploration during the project. After I generated more than one thousand images during my project, I will answer my starting questions and explain how the AI handled my challenges. Also I will point out what the AI was able to create and the limitations I faced. 

During my exploration I encountered several limitations of its ability to generate truly new and imaginative creatures. As I experienced when creating an image, the AI will choose something like a “base animal”. This helped the AI to understand the prompt and create the image around this base. As you can imagine, this base animal and its characteristics had a huge impact on the whole output. Depending on the chosen base animal, the AI was ignoring one or another feature of the given prompt. For example, when the base animal would be a cat, the AI was only able (with some rare exceptions) to give this cat exactly four legs. Because everything else would be wrong for the AI.
Based on this behaviour and its training data, this resulted in the AI producing combinations of known elements rather than creating entirely new ones. I think Fooocus would understand the given prompt but it is trained too much to recreate realistic animals, so it lacks the ability of creating new creatures it has never seen.

Furthermore, when specifying numerical features, such as the number of limbs or eyes, the AI frequently disregarded these details. The dominant influence of the base animal typically overpowered these instructions, resulting in a final image that adhered more closely to the base form than to the specified modifications.

Another limitation was the AI's reliance on a fairly small set of base animals. I had a really hard time getting the AI to create a certain type of animal without naming it. For example: snakes, monkeys and even for horses the AI gave me most of the time deers and goats. The model most of the time used the same approximately ten base animals, showing to fall back on the most likely animals and not incorporate more exotic or diverse bases for creating new creatures. This constraint further hindered the variety and uniqueness of the generated images.

Despite these limitations, the AI was surprisingly consistent. However, even slight changes in the prompt sometimes the used base animal altered, leading to significant changes in the final image. This indicated that while the model could reliably reproduce certain images, its sensitivity to prompt variations posed a challenge in achieving desired outcomes.

For the questions I asked myself at the beginning of my project i found following answers:
- How specific can I describe the images and how many details can the AI include?

> There is no simple answer to this question because it strongly differs between images. Generally I could include a super specific and detailed description and normally this wouldn’t be any problem. The Problem started with the AI’s lack of including certain details to certain base animals or other details. This means that often details would be excluded or disappear in the generation process when the AI was trying to match its training data.


- What details are more challenging for the AI to include?
> As mentioned before, the numbers were most of the time ignored. For example it was really hard to change the number of legs, arms, ears, mouth, eyes, horns, fins, tales, etc. For the skin, I found smooth skin without scales like an eel or sheds difficult to include. Specific details like, long or hanging bunny ears, specific horns, like only one or soft giraffe horns and also climbing animals were really difficult to get.


- How consistent is the AI with the generated images?
> The model was surprisingly consistent. Most of the time the AI took the same turns and included the same details with the same overall look. Also little changes on the prompt were included specifically. As described there are just big jumps between what I call the base animals. So if the AI happens to change the base animal on just a small detail in the prompt, it generates a completely different animal.


- Can I define specific surroundings without losing details of the creature?
> From my experience, I did not find myself losing details on the animal, when specifying the surrounding environment. However the surroundings did have an impact on the created animal. So on a complete change of the surrounding, there was a change, of the animal being changed. This was, because the AI just knows some animals and details in some environment. For example, fur in water or in a hot desert, is unlikely for the AI to generate.

In summary, Fooocus demonstrated a notable ability to generate consistent images based on given prompts, but it also revealed several significant limitations. The AI heavily relied on base animals, which constrained its creativity and led to the combination of familiar elements rather than the creation of entirely new ones. Numerical specifications and certain details were often ignored, and the model struggled to incorporate more exotic or diverse bases.

# Resources
In this chapter, I would like to acknowledge the used tools and resources that made this project possible and were crucial for the development of unknown life:
- Fooocus: https://github.com/lllyasviel/Fooocus
- WebUI: https://github.com/AUTOMATIC1111/stable-diffusion-webui
- SDXL 1.0: https://huggingface.co/stabilityai/stable-diffusion-xl-base-1.0/tree/main
- SDXL 1.0 Refiner: https://huggingface.co/stabilityai/stable-diffusion-xl-refiner-1.0/tree/main
- SD 1.5: https://huggingface.co/runwayml/stable-diffusion-v1-5
- LoRA, ThinkDiffusionXL 1.0: https://civitai.com/models/169868/thinkdiffusionxl
- LoRA, PicX real 1.0: https://civitai.com/models/241415/picxreal?modelVersionId=272376
- https://www.anaconda.com/
- https://www.docker.com/
- ChatGPT (free to use ), assisting on translations, wordings and grammatical corrections: https://chatgpt.com/