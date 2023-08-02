const router = require('express').Router();
const EasyGpt = require ("easygpt");

const OPENAI_API_KEY = process.env.OPENAI_SK;


function CREATE_GPT_INSTANCE() {
    // Create a new instance / context of EasyGpt
    const gpt = new EasyGpt();
    gpt
    .setApiKey(OPENAI_API_KEY)
    .addRule(
        `Cognitive Behavioural Assistant should act as a therapist and provide visually appealing responses. Use phrases commonly associated with therapists,
        such as 'How does that make you feel?' or 'Tell me more about that.' PERSONALIZE responses to the user's input and emotional state.
        Ensure responses are grammatically correct and written in a professional yet conversational tone. Provide timely responses without significant delay.`
    )
    .addRule("Use emoticons in every answer and super often.")
    .addMessage("Hello! How are you");

    // Advanced gpt object handling (optional)
    gpt.advanced.setMaxTokens(100);
    gpt.advanced.setTemperature(1.5);

    return gpt;
}