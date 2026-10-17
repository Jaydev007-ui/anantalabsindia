// ============================================================================
// ANANTA LABS INDIA — INTENT ROUTER & CAPABILITY DISPATCHER
// ============================================================================

export type UserIntent =
  | 'PRODUCT_DISCOVERY'
  | 'TECHNICAL_EXPLANATION'
  | 'LEAD_QUALIFICATION'
  | 'COMPANY_INFO'
  | 'HUMAN_ESCALATION'
  | 'GENERAL_CONVERSATION';

export interface IntentAnalysis {
  intent: UserIntent;
  confidence: number;
  entities: {
    productName?: string;
    technology?: string;
    action?: string;
  };
}

export function routeUserIntent(message: string): IntentAnalysis {
  const text = (message || '').toLowerCase().trim();

  // 1. Human Escalation Intent
  if (
    text.includes('human') ||
    text.includes('representative') ||
    text.includes('talk to someone') ||
    text.includes('call') ||
    text.includes('phone number') ||
    text.includes('email address') ||
    text.includes('contact person')
  ) {
    return {
      intent: 'HUMAN_ESCALATION',
      confidence: 0.95,
      entities: { action: 'escalate_to_human' }
    };
  }

  // 2. Lead Qualification / Project Inquiry Intent
  if (
    text.includes('discuss a project') ||
    text.includes('hire') ||
    text.includes('partner') ||
    text.includes('quote') ||
    text.includes('cost') ||
    text.includes('consultation') ||
    text.includes('collaborate') ||
    text.includes('build for me') ||
    text.includes('custom prototype') ||
    text.includes('r&d contract')
  ) {
    return {
      intent: 'LEAD_QUALIFICATION',
      confidence: 0.9,
      entities: { action: 'start_lead_capture' }
    };
  }

  // 3. Product Discovery Intent
  if (
    text.includes('product') ||
    text.includes('store') ||
    text.includes('hardware store') ||
    text.includes('buy') ||
    text.includes('purchase') ||
    text.includes('esp32') ||
    text.includes('camera node') ||
    text.includes('pump') ||
    text.includes('price') ||
    text.includes('catalog')
  ) {
    let productName: string | undefined;
    if (text.includes('esp32') || text.includes('camera') || text.includes('node')) {
      productName = 'ESP32-CAM Industrial Vision Node';
    } else if (text.includes('pump') || text.includes('fluid')) {
      productName = 'Precision Microfluidic Pump';
    }
    return {
      intent: 'PRODUCT_DISCOVERY',
      confidence: 0.88,
      entities: { productName, action: 'browse_products' }
    };
  }

  // 4. Technical / Engineering Intent
  if (
    text.includes('how does') ||
    text.includes('yolo') ||
    text.includes('computer vision') ||
    text.includes('tinyml') ||
    text.includes('fluidics') ||
    text.includes('pressure sensor') ||
    text.includes('code') ||
    text.includes('architecture') ||
    text.includes('openvino') ||
    text.includes('dma') ||
    text.includes('rtos') ||
    text.includes('algorithm') ||
    text.includes('model') ||
    text.includes('swachhvision') ||
    text.includes('embalming')
  ) {
    return {
      intent: 'TECHNICAL_EXPLANATION',
      confidence: 0.85,
      entities: { technology: text }
    };
  }

  // 5. Company / Laboratory Info Intent
  if (
    text.includes('who is') ||
    text.includes('founder') ||
    text.includes('director') ||
    text.includes('jaydevsinh') ||
    text.includes('ananta labs') ||
    text.includes('where is') ||
    text.includes('vadodara') ||
    text.includes('location') ||
    text.includes('patents') ||
    text.includes('certification') ||
    text.includes('intel partner')
  ) {
    return {
      intent: 'COMPANY_INFO',
      confidence: 0.9,
      entities: { action: 'company_facts' }
    };
  }

  return {
    intent: 'GENERAL_CONVERSATION',
    confidence: 0.7,
    entities: {}
  };
}
