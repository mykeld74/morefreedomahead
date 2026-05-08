export type CheckoutInput = {
	eventTitle: string;
	amountCents: number;
	currency: string;
	successUrl: string;
	cancelUrl: string;
	metadata: Record<string, string>;
	customerEmail: string;
};

export type CheckoutResult = {
	provider: 'manual';
	checkoutSessionId: string;
	checkoutUrl: string;
};

export interface PaymentProvider {
	createCheckout(input: CheckoutInput): Promise<CheckoutResult>;
}

class ManualPaymentProvider implements PaymentProvider {
	async createCheckout(input: CheckoutInput): Promise<CheckoutResult> {
		// Stripe is temporarily disabled while we continue building.
		// This keeps the registration flow moving without external payment setup.
		void input;
		return {
			provider: 'manual',
			checkoutSessionId: `manual-${Date.now()}`,
			checkoutUrl: '/events/success?manual=1'
		};
	}
}

export const paymentProvider: PaymentProvider = new ManualPaymentProvider();
