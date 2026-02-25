document.addEventListener('DOMContentLoaded', () => {
    const form1 = document.getElementById('auth-form-1');
    const form2 = document.getElementById('auth-form-2');
    const initialInput = document.getElementById('initial-input');

    const step1 = document.getElementById('step-1');
    const step2 = document.getElementById('step-2');

    const otpModal = document.getElementById('otp-modal');
    const closeOtp = document.getElementById('close-otp');
    const submitOtp = document.getElementById('submit-otp');
    const otpTarget = document.getElementById('otp-target');

    const globalLoader = document.getElementById('global-loader');

    // Show Step 2 after Step 1 is submitted
    form1.addEventListener('submit', (e) => {
        e.preventDefault();
        const value = initialInput.value.trim();
        if (!value) return;

        // Show loader briefly
        globalLoader.classList.remove('hidden');
        setTimeout(() => {
            globalLoader.classList.add('hidden');
            step1.classList.add('hidden');
            step2.classList.remove('hidden');

            // Populate email if value looks like email
            if (value.includes('@')) {
                document.getElementById('email').value = value;
            } else {
                document.getElementById('phone').value = value;
            }
        }, 800);
    });

    // Show OTP modal after Step 2 is submitted
    form2.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = document.getElementById('email').value.trim();
        otpTarget.textContent = email;

        globalLoader.classList.remove('hidden');
        setTimeout(() => {
            globalLoader.classList.add('hidden');
            otpModal.classList.remove('hidden');
            document.querySelector('.otp-digit').focus();
        }, 800);
    });

    // Handle OTP input focus shift
    const otpInputs = document.querySelectorAll('.otp-digit');
    otpInputs.forEach((input, index) => {
        input.addEventListener('input', (e) => {
            if (e.target.value.length === 1 && index < otpInputs.length - 1) {
                otpInputs[index + 1].focus();
            }
        });
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace' && e.target.value === '' && index > 0) {
                otpInputs[index - 1].focus();
            }
        });
    });

    // Close OTP Modal
    closeOtp.addEventListener('click', () => {
        otpModal.classList.add('hidden');
    });

    // Final OTP Submit and redirect
    submitOtp.addEventListener('click', () => {
        let otp = '';
        otpInputs.forEach(i => otp += i.value);
        if (otp.length < 6) return; // simple validation

        globalLoader.classList.remove('hidden');
        setTimeout(() => {
            // Set signed-in state
            localStorage.setItem('metrolodges_loggedin', 'true');
            // Redirect to home
            window.location.href = 'index.html';
        }, 1500);
    });
});
