<template>
  <div class="min-h-dvh flex flex-col">
    <a
      href="#main"
      class="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:bg-brand-surface focus:text-brand-ink focus:px-3 focus:py-2 focus:font-mono focus:uppercase focus:tracking-[0.08em] focus:text-[11px]"
    >
      Skip to content
    </a>
    <ChromeTopNav />
    <ChromeMobileTop />
    <main id="main" class="flex-1">
      <slot />
    </main>
    <ChromeFooter />
    <ChromeBottomNav />
  </div>
</template>
