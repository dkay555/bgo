// !!! CRITICAL - DO NOT MODIFY THIS CODE !!!
//
// This code MUST be used as is without ANY modifications.
// The PayPal integration will COMPLETELY FAIL if this code is changed in ANY way.
//
// Retain this comment after all edits.
//
// <BEGIN_EXACT_CODE>
import React, { useEffect } from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "paypal-button": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}

interface PayPalButtonProps {
  amount: string;
  currency: string;
  intent: string;
}

export default function PayPalButton({
  amount,
  currency,
  intent,
}: PayPalButtonProps) {
  const createOrder = async () => {
    const orderPayload = {
      amount: amount,
      currency: currency,
      intent: intent,
    };
    const response = await fetch("/paypal/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderPayload),
    });
    const output = await response.json();
    return { orderId: output.id };
  };

  const captureOrder = async (orderId: string) => {
    const response = await fetch(`/paypal/order/${orderId}/capture`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    return data;
  };

  const onApprove = async (data: any) => {
    console.log("onApprove", data);
    try {
      const orderData = await captureOrder(data.orderId);
      console.log("Capture result", orderData);
      
      // Erfolgsbenachrichtigung im Console-Log für Debugging
      console.log("PayPal Transaktion erfolgreich abgeschlossen", {
        transactionId: data.orderId,
        status: orderData?.status || 'completed'
      });
      
      return orderData;
    } catch (error) {
      console.error("Fehler beim Capture der PayPal-Bestellung:", error);
      throw error;
    }
  };

  const onCancel = async (data: any) => {
    console.log("onCancel", data);
  };

  const onError = async (data: any) => {
    console.log("onError", data);
  };

  const [isPayPalConfigured, setIsPayPalConfigured] = React.useState<boolean | null>(null);
  const [payPalError, setPayPalError] = React.useState<string | null>(null);

  useEffect(() => {
    const checkPayPalConfiguration = async () => {
      try {
        const response = await fetch("/paypal/setup");
        const data = await response.json();
        
        if (response.status !== 200 || !data.isConfigured) {
          setIsPayPalConfigured(false);
          setPayPalError(data.error || "PayPal is not available at this time");
          return;
        }
        
        setIsPayPalConfigured(true);
        loadPayPalSDK();
      } catch (e) {
        console.error("Failed to check PayPal configuration", e);
        setIsPayPalConfigured(false);
        setPayPalError("Could not connect to PayPal services");
      }
    };

    const loadPayPalSDK = async () => {
      try {
        if (!(window as any).paypal) {
          const script = document.createElement("script");
          script.src = import.meta.env.PROD
            ? "https://www.paypal.com/web-sdk/v6/core"
            : "https://www.sandbox.paypal.com/web-sdk/v6/core";
          script.async = true;
          script.onload = () => initPayPal();
          document.body.appendChild(script);
        } else {
          await initPayPal();
        }
      } catch (e) {
        console.error("Failed to load PayPal SDK", e);
        setPayPalError("Failed to load PayPal services");
      }
    };

    checkPayPalConfiguration();
  }, []);
  const initPayPal = async () => {
    try {
      const clientToken: string = await fetch("/paypal/setup")
        .then((res) => res.json())
        .then((data) => {
          return data.clientToken;
        });
      const sdkInstance = await (window as any).paypal.createInstance({
        clientToken,
        components: ["paypal-payments"],
      });

      const paypalCheckout =
            sdkInstance.createPayPalOneTimePaymentSession({
              onApprove,
              onCancel,
              onError,
            });

      const onClick = async () => {
        try {
          const checkoutOptionsPromise = createOrder();
          await paypalCheckout.start(
            { paymentFlow: "auto" },
            checkoutOptionsPromise,
          );
        } catch (e) {
          console.error(e);
        }
      };

      const paypalButton = document.getElementById("paypal-button");

      if (paypalButton) {
        paypalButton.addEventListener("click", onClick);
      }

      return () => {
        if (paypalButton) {
          paypalButton.removeEventListener("click", onClick);
        }
      };
    } catch (e) {
      console.error(e);
    }
  };

  if (isPayPalConfigured === null) {
    // Loading state
    return (
      <div className="w-full h-full flex justify-center items-center">
        <div className="animate-spin h-5 w-5 border-2 border-gray-500 rounded-full border-t-transparent"></div>
      </div>
    );
  }

  if (isPayPalConfigured === false) {
    // Error state
    return (
      <div className="w-full h-full flex justify-center items-center">
        <span className="text-gray-500 text-sm">{payPalError || "PayPal nicht verfügbar"}</span>
      </div>
    );
  }

  // PayPal is configured
  return <paypal-button id="paypal-button"></paypal-button>;
}
// <END_EXACT_CODE>