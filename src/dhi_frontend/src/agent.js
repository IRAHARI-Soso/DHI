import { HttpAgent, Actor } from '@dfinity/agent';
import { idlFactory } from './declarations/DecentralizedHealthInsurance.did.js';

const canisterId = 'YOUR_CANISTER_ID';

const agent = new HttpAgent();

export const createActor = (canisterId, options) => {
  return Actor.createActor(idlFactory, {
    agent,
    canisterId,
    ...options,
  });
};

export const decentralizedHealthInsurance = createActor(canisterId);
