import { MasterAIService } from '../plugins/custom-voice-engine/services/master-ai/master-ai.service';

async function testMasterAI() {
  console.log('Testing MasterAIService...');
  const masterAI = new MasterAIService();

  // Test 1: Backchannel
  console.assert(masterAI.isBackchannel('uh-huh') === true, 'Failed: uh-huh should be backchannel');
  console.assert(masterAI.isBackchannel('haan', 'hi') === true, 'Failed: haan should be backchannel');
  console.assert(masterAI.isBackchannel('theek hai', 'hi') === true, 'Failed: theek hai should be backchannel');
  console.assert(masterAI.isBackchannel('book an appointment') === false, 'Failed: intent is not backchannel');
  console.log('✔ Backchannel tests passed!');

  // Test 2: Hard Interruption
  console.assert(masterAI.isHardInterruption('wait stop') === true, 'Failed: wait stop should be hard interruption');
  console.assert(masterAI.isHardInterruption('ek minute') === true, 'Failed: ek minute should be hard interruption');
  console.assert(masterAI.isHardInterruption('what is your name') === false, 'Failed: what is your name is not hard interruption');
  console.log('✔ Hard Interruption tests passed!');

  // Test 3: Action Gate
  const hangup = masterAI.evaluateAction('alvida');
  console.assert(hangup?.action === 'hangup', 'Failed: alvida should trigger hangup');
  const transfer = masterAI.evaluateAction('connect to manager');
  console.assert(transfer?.action === 'transfer', 'Failed: connect to manager should trigger transfer');
  console.log('✔ Action Gate tests passed!');

  // Test 4: Slot Extractor
  const slots = masterAI.extractSlots('Please book for tomorrow at 4 pm on 9876543210');
  console.assert(slots.phoneNumber === '9876543210', 'Failed to extract phone number');
  console.assert(slots.timeSlot?.includes('4 pm'), 'Failed to extract time slot');
  console.assert(Boolean(slots.normalizedDate), 'Failed to extract normalized date');
  console.log('✔ Slot Extractor tests passed!');

  console.log('🎉 ALL MASTER AI SERVICE TESTS PASSED!');
  process.exit(0);
}

testMasterAI().catch(err => {
  console.error(err);
  process.exit(1);
});
