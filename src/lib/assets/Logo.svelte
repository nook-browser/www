<script lang="ts">
    export let className: string = '';
  </script>
  
  <svg {className} viewBox="0 0 64 64" aria-label="Nook logo" role="img">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#9cb57f"/>
        <stop offset="1" stop-color="#0f2b1f"/>
      </linearGradient>
    </defs>
    <!-- house/nook: rounded square w/ doorway -->
    <rect x="6" y="6" width="52" height="52" rx="14" fill="url(#g)" />
    <path d="M19 45v-9.5c0-1 .5-1.9 1.3-2.5l10.7-8.3a3 3 0 013.7 0l10.7 8.3a3.1 3.1 0 011.3 2.5V45"
          fill="#f9f8f4" opacity=".9"/>
    <rect x="29" y="36" width="6" height="9" rx="2" fill="#07140f" opacity=".9"/>
  </svg>